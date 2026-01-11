import Dexie, { type EntityTable } from 'dexie';

// Type definitions
export interface User {
    id?: number;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
}

export interface MaterialItem {
    name: string;
    category: 'structural' | 'finishing' | 'electrical' | 'plumbing';
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
    riskLevel: 'low' | 'medium' | 'high';
}

export interface Project {
    id?: number;
    userId: number;
    title: string;
    address: string;
    latitude: string;
    longitude: string;
    plotSize: number;
    plotUnit: 'acres' | 'sqft';
    zoningType: string;
    topography: 'flat' | 'sloped' | 'mixed';
    status: 'draft' | 'analyzing' | 'complete';
    // India-specific land inputs
    city: string;
    constructionType: 'residential' | 'commercial';
    builtUpPercent: number;
    foundationType: 'rcc' | 'strip' | 'pile';
    // AI-generated data
    materials: MaterialItem[];
    totalArea: number;
    floors: number;
    hasBasement: boolean;
    estimatedTimeline: number;
    estimatedCost: number;
    createdAt: Date;
}

// Database class
const db = new Dexie('land2build-db') as Dexie & {
    users: EntityTable<User, 'id'>;
    projects: EntityTable<Project, 'id'>;
};

// Schema
db.version(1).stores({
    users: '++id, email',
    projects: '++id, userId, status, createdAt'
});

export { db };
