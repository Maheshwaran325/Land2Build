import OpenAI from 'openai';
import type { MaterialItem } from '../db';
import type { HouseType } from '../components/3d/procedural/FloorPlan';

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
    designStyle?: 'modern' | 'traditional' | 'colonial' | 'minimalist';
    houseType?: HouseType;
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
Given a user's description of a building, extract the following JSON configuration.

HOUSE TYPES:
- "standard": Basic rectangular house layout (default for most requests)
- "villa": Large luxury home with garage, multiple bedrooms, puja room
- "duplex": Two independent living units in one building (for "twin house", "2 units", "rental income")
- "lshaped": L-shaped layout providing courtyard-like outdoor space
- "courtyard": Traditional design with central open courtyard (for "aangan", "central garden", "vastu")
- "apartment": Compact multi-floor layout (for "flat", "apartment", "compact")
- "bungalow": Single-story spread-out layout (for "single floor", "no stairs", "elderly-friendly")

DESIGN STYLES:
- "modern": Open plan layout, clean lines, minimalist furniture
- "traditional": Separate rooms, formal dining area, classic elements
- "colonial": Large rooms, formal spaces, grand entrance
- "minimalist": Ultra-clean, minimal furniture, open spaces

INTERPRETATION RULES:
1. If user mentions "retirement" or "elderly" → bungalow (single floor, no stairs)
2. If user mentions "luxury" or "big family" → villa
3. If user mentions "rental" or "two families" → duplex  
4. If user mentions "compact" or "small plot" → apartment
5. If user mentions "vastu" or "fresh air" or "courtyard" → courtyard
6. If user mentions "corner plot" or "garden view" → lshaped
7. For dimensions: use sensible defaults (width: 10-15m, length: 12-18m based on type)
8. Bungalow always has 1 floor, apartment has 3+ floors

Return JSON:
{
  "width": <number in meters>,
  "length": <number in meters>,
  "floors": <number>,
  "roofType": "flat" | "gable" | "hip",
  "wallMaterial": "brick" | "concrete" | "aac_block",
  "designStyle": "modern" | "traditional" | "colonial" | "minimalist",
  "houseType": "standard" | "villa" | "duplex" | "lshaped" | "courtyard" | "apartment" | "bungalow"
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
            max_tokens: 300
        });

        const content = response.choices[0]?.message?.content;
        if (!content) return null;

        // Parse JSON - handle potential markdown code blocks
        let jsonStr = content.trim();
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
        }

        return JSON.parse(jsonStr) as BuildingConfig;
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

        // Parse JSON - handle potential markdown code blocks
        let jsonStr = content.trim();
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
        }

        return JSON.parse(jsonStr) as CostPrediction;
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

/**
 * Get house type description for UI display
 */
export function getHouseTypeDescription(houseType: HouseType): string {
    const descriptions: Record<HouseType, string> = {
        standard: 'Standard house layout with living, kitchen, bedrooms',
        villa: 'Luxury villa with garage, puja room, multiple bedrooms',
        duplex: 'Two independent living units in one building',
        lshaped: 'L-shaped layout with corner entrance and garden view',
        courtyard: 'Traditional design with central open courtyard',
        apartment: 'Compact multi-floor apartment layout',
        bungalow: 'Single-story spread-out layout, no stairs'
    };
    return descriptions[houseType] || descriptions.standard;
}

/**
 * Example prompts for the AI Architect
 */
export const AI_PROMPT_EXAMPLES = [
    "Modern 3-bedroom villa with garage",
    "Traditional house with central courtyard",
    "Compact 2BHK apartment",
    "Single-floor bungalow for retired couple",
    "L-shaped house with garden view",
    "Duplex for rental income",
    "Minimalist 2-story home"
];
