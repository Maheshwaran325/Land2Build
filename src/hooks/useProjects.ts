import { db, type Project } from '../db';
import { useAuth } from '../context/AuthContext';

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
    }): Promise<number | null> => {
        if (!user?.id) return null;

        // Generate mock "AI-computed" values for the prototype
        const plotSizeInSqFt = data.plotUnit === 'acres' ? data.plotSize * 43560 : data.plotSize;
        const mockFloors = Math.max(1, Math.floor(Math.random() * 3) + 1);
        const baseCostPerSqFt = data.zoningType === 'commercial' ? 250 : 180;

        const id = await db.projects.add({
            userId: user.id,
            ...data,
            status: 'complete',
            // Mock computed values
            totalArea: Math.round(plotSizeInSqFt * 0.6), // 60% coverage
            floors: mockFloors,
            hasBasement: Math.random() > 0.5,
            estimatedTimeline: Math.floor(Math.random() * 12) + 8, // 8-20 months
            estimatedCost: Math.round(plotSizeInSqFt * 0.6 * baseCostPerSqFt),
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
