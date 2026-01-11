import { db, type Project } from '../db';
import { useAuth } from '../context/AuthContext';
import { predictCostAndMaterials, type LandInputs } from '../services/aiService';

export function useProjects() {
    const { user } = useAuth();

    const createProject = async (data: {
        title: string;
        address: string;
        latitude: string;
        longitude: string;
        plotSize: number;
        plotUnit: 'acres' | 'sqft';
        zoningType: string;
        topography: 'flat' | 'sloped' | 'mixed';
        // Building specifications
        city: string;
        floors: number;
        constructionType: 'residential' | 'commercial';
        builtUpPercent: number;
        foundationType: 'rcc' | 'strip' | 'pile';
    }): Promise<number | null> => {
        if (!user?.id) return null;

        // Calculate derived values from user inputs
        const plotSizeInSqFt = data.plotUnit === 'acres' ? data.plotSize * 43560 : data.plotSize;
        const footprintArea = Math.round(plotSizeInSqFt * (data.builtUpPercent / 100));
        const totalBuiltUpArea = footprintArea * data.floors;

        // Prepare inputs for AI
        const aiInputs: LandInputs = {
            plotSize: plotSizeInSqFt,
            city: data.city,
            constructionType: data.constructionType,
            floors: data.floors,
            builtUpPercent: data.builtUpPercent,
            foundationType: data.foundationType
        };

        // Generate Cost & Materials via AI
        let materials: any[] = [];
        let aiEstimatedCost = 0;

        try {
            const result = await predictCostAndMaterials(aiInputs);
            if (result) {
                materials = result.materials || [];
                aiEstimatedCost = result.totalCost || 0;
            }
        } catch (error) {
            console.error('Failed to generate AI data:', error);
            // Fallback to basic calculation if AI fails
        }

        // Fallback Cost calculation based on construction type and foundation (if AI returns 0 or fails)
        let baseCostPerSqFt = data.constructionType === 'commercial' ? 2200 : 1800;
        if (data.foundationType === 'pile') baseCostPerSqFt += 300;
        if (data.foundationType === 'strip') baseCostPerSqFt -= 100;

        const fallbackCost = Math.round(totalBuiltUpArea * baseCostPerSqFt);
        const finalCost = aiEstimatedCost > 0 ? aiEstimatedCost : fallbackCost;

        // Timeline estimation based on size and floors
        const baseTimeline = 6; // months
        const sizeMultiplier = Math.ceil(totalBuiltUpArea / 1000);
        const estimatedMonths = Math.min(24, baseTimeline + sizeMultiplier + data.floors * 2);

        const id = await db.projects.add({
            userId: user.id,
            ...data,
            status: 'complete',
            materials: materials,
            // Computed values
            totalArea: totalBuiltUpArea,
            hasBasement: false,
            estimatedTimeline: estimatedMonths,
            estimatedCost: finalCost,
            createdAt: new Date()
        });

        return id as number;
    };

    const getProject = async (id: number): Promise<Project | undefined> => {
        return await db.projects.get(id);
    };

    const getUserProjects = async (): Promise<Project[]> => {
        if (!user?.id) return [];
        return await db.projects.where('userId').equals(user.id).reverse().toArray();
    };

    const deleteProject = async (id: number): Promise<void> => {
        await db.projects.delete(id);
    };

    return {
        createProject,
        getProject,
        getUserProjects,
        deleteProject
    };
}
