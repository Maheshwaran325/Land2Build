import OpenAI from 'openai';
import type { MaterialItem } from '../db';

// Nebius API client (OpenAI-compatible)
const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: import.meta.env.VITE_NEBIUS_API_KEY || '',
    dangerouslyAllowBrowser: true // For client-side usage
});

export interface BuildingConfig {
    width: number;      // meters
    length: number;     // meters
    floors: number;
    roofType: 'flat' | 'gable' | 'hip';
    wallMaterial: 'brick' | 'concrete' | 'aac_block';
}

export interface LandInputs {
    plotSize: number;           // sq.ft
    city: string;
    constructionType: 'residential' | 'commercial';
    floors: number;
    builtUpPercent: number;
    foundationType: 'rcc' | 'strip' | 'pile';
}

export interface CostPrediction {
    materials: MaterialItem[];
    totalCost: number;
    costPerSqFt: number;
    estimatedTimeline: number;  // months
}

const SYSTEM_PROMPT_CONFIG = `You are an AI architect assistant for Indian construction projects.
Given a user's description of a building, extract the following JSON configuration:
{
  "width": <number in meters>,
  "length": <number in meters>,
  "floors": <number>,
  "roofType": "flat" | "gable" | "hip",
  "wallMaterial": "brick" | "concrete" | "aac_block"
}
Respond ONLY with valid JSON, no explanation.`;

const SYSTEM_PROMPT_COST = `You are a construction cost estimator for Indian projects.
Given land inputs, generate a Bill of Materials (BoM) with realistic Indian prices.
Return JSON in this format:
{
  "materials": [
    {
      "name": "Cement (OPC 53)",
      "category": "structural",
      "quantity": 500,
      "unit": "bags",
      "unitPrice": 380,
      "totalPrice": 190000,
      "riskLevel": "low"
    }
  ],
  "totalCost": <sum of all material totalPrice>,
  "costPerSqFt": <totalCost / built-up area>,
  "estimatedTimeline": <months>
}
Categories: structural, finishing, electrical, plumbing
Risk levels: low, medium, high
Use realistic 2024-2025 Indian market prices in ₹.
Respond ONLY with valid JSON.`;

/**
 * Generate building configuration from natural language description
 */
export async function generateBuildingConfig(prompt: string): Promise<BuildingConfig | null> {
    try {
        const response = await client.chat.completions.create({
            model: 'Qwen/Qwen3-30B-A3B-Instruct-2507',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT_CONFIG },
                { role: 'user', content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 200
        });

        const content = response.choices[0]?.message?.content;
        if (!content) return null;

        return JSON.parse(content) as BuildingConfig;
    } catch (error) {
        console.error('AI Config Generation Error:', error);
        return null;
    }
}

/**
 * Predict cost and materials from land inputs using AI
 */
export async function predictCostAndMaterials(inputs: LandInputs): Promise<CostPrediction | null> {
    const userPrompt = `
Land Inputs:
- Plot Size: ${inputs.plotSize} sq.ft
- City: ${inputs.city}
- Type: ${inputs.constructionType}
- Floors: ${inputs.floors}
- Built-up %: ${inputs.builtUpPercent}%
- Foundation: ${inputs.foundationType.toUpperCase()}

Built-up Area: ${Math.round(inputs.plotSize * inputs.builtUpPercent / 100)} sq.ft

Generate a detailed Bill of Materials with Indian market prices.`;

    try {
        const response = await client.chat.completions.create({
            model: 'Qwen/Qwen3-30B-A3B-Instruct-2507',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT_COST },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.4,
            max_tokens: 1500
        });

        const content = response.choices[0]?.message?.content;
        if (!content) return null;

        return JSON.parse(content) as CostPrediction;
    } catch (error) {
        console.error('AI Cost Prediction Error:', error);
        return null;
    }
}

/**
 * Check if Nebius API is configured
 */
export function isAIConfigured(): boolean {
    return !!import.meta.env.VITE_NEBIUS_API_KEY;
}
