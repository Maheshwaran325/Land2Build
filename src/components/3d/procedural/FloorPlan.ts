export type HouseType = 'standard' | 'bungalow' | 'villa' | 'apartment' | 'courtyard' | 'duplex' | 'lshaped';

export interface Room {
    id: string;
    x: number; // Center X
    y: number; // Center Z (mapped to y)
    width: number;
    length: number;
    type: 'living' | 'kitchen' | 'bedroom' | 'bathroom' | 'dining' | 'hallway' | 'utility';
    color: string;
    hasFrontDoor?: boolean;
    isExterior: {
        top: boolean; // -z (north)
        bottom: boolean; // +z (south)
        left: boolean; // -x (west)
        right: boolean; // +x (east)
    };
}

interface RectNode {
    x: number;
    y: number;
    w: number;
    h: number;
    left?: RectNode;
    right?: RectNode;
    roomType?: Room['type'];
    id?: string;
}

// Helper to determine if a point (or center) is close to the global bounding box edge
function isExteriorBoundary(val: number, bound: number, tolerance = 0.1): boolean {
    return Math.abs(val - bound) < tolerance;
}

function partitionRect(rect: RectNode, minSize: number, iterations: number, forceSplit?: 'H' | 'V'): void {
    if (iterations <= 0) return;

    let splitH = Math.random() > 0.5;
    if (rect.w / rect.h > 1.25) splitH = false; // Too wide, split vertical
    else if (rect.h / rect.w > 1.25) splitH = true; // Too tall, split horizontal

    if (forceSplit === 'H') splitH = true;
    if (forceSplit === 'V') splitH = false;

    const max = (splitH ? rect.h : rect.w) - minSize;
    if (max <= minSize) return; // Cannot split further

    // Random split point between 40% and 60%
    const ratio = 0.4 + Math.random() * 0.2;
    const split = Math.round((splitH ? rect.h : rect.w) * ratio * 10) / 10;

    if (split < minSize || (splitH ? rect.h - split : rect.w - split) < minSize) return;

    if (splitH) {
        rect.left = { x: rect.x, y: rect.y, w: rect.w, h: split };
        rect.right = { x: rect.x, y: rect.y + split, w: rect.w, h: rect.h - split };
    } else {
        rect.left = { x: rect.x, y: rect.y, w: split, h: rect.h };
        rect.right = { x: rect.x + split, y: rect.y, w: rect.w - split, h: rect.h };
    }

    partitionRect(rect.left, minSize, iterations - 1);
    partitionRect(rect.right, minSize, iterations - 1);
}

function collectLeaves(node: RectNode, leaves: RectNode[] = []): RectNode[] {
    if (!node.left && !node.right) {
        leaves.push(node);
    } else {
        if (node.left) collectLeaves(node.left, leaves);
        if (node.right) collectLeaves(node.right, leaves);
    }
    return leaves;
}

const ROOM_COLORS = {
    living: '#f0f8ff',
    kitchen: '#fffacd',
    bedroom: '#e6e6fa',
    bathroom: '#f5f5dc',
    dining: '#ffe4e1',
    hallway: '#f5f5f5',
    utility: '#e0e0e0',
};

export function generateFloorPlan(width: number, length: number, _designStyle: string, houseType: HouseType): Room[] {
    const rooms: Room[] = [];
    const mainRect: RectNode = { x: -width / 2, y: -length / 2, w: width, h: length };
    let initialLeaves: RectNode[] = [];

    // 1. Footprint modification based on HouseType
    if (houseType === 'lshaped') {
        // Cut out top-right corner to form an L
        const LRatioX = 0.6;
        const LRatioY = 0.6;
        const mainW = width * LRatioX;
        const mainH = length * LRatioY;
        
        // Base stem (left side full length)
        const leftStem: RectNode = { x: -width/2, y: -length/2, w: mainW, h: length };
        // Bottom wing (right side bottom)
        const rightWing: RectNode = { x: -width/2 + mainW, y: length/2 - (length - mainH), w: width - mainW, h: length - mainH };
        
        partitionRect(leftStem, 3, 2);
        partitionRect(rightWing, 3, 1);
        
        initialLeaves.push(...collectLeaves(leftStem));
        initialLeaves.push(...collectLeaves(rightWing));

    } else if (houseType === 'courtyard') {
        // Ring of rooms around a central hole
        const thick = Math.min(width, length) * 0.3;
        
        const top: RectNode = { x: -width/2, y: -length/2, w: width, h: thick };
        const bottom: RectNode = { x: -width/2, y: length/2 - thick, w: width, h: thick };
        const left: RectNode = { x: -width/2, y: -length/2 + thick, w: thick, h: length - thick*2 };
        const right: RectNode = { x: width/2 - thick, y: -length/2 + thick, w: thick, h: length - thick*2 };
        
        partitionRect(top, 3, 1, 'V');
        partitionRect(bottom, 3, 1, 'V');
        
        initialLeaves.push(...collectLeaves(top));
        initialLeaves.push(...collectLeaves(bottom));
        initialLeaves.push(left);
        initialLeaves.push(right);

    } else if (houseType === 'duplex') {
        // Split halfway
        const half1: RectNode = { x: -width/2, y: -length/2, w: width/2, h: length };
        const half2: RectNode = { x: 0, y: -length/2, w: width/2, h: length };
        
        partitionRect(half1, 3, 2);
        partitionRect(half2, 3, 2);
        
        initialLeaves.push(...collectLeaves(half1));
        initialLeaves.push(...collectLeaves(half2));
        
    } else {
        // Standard, Villa, Bungalow, Apartment
        const minRoomSize = houseType === 'villa' ? 4 : houseType === 'apartment' ? 2.5 : 3.5;
        const iterations = houseType === 'villa' ? 4 : houseType === 'bungalow' ? 2 : 3;
        
        partitionRect(mainRect, minRoomSize, iterations);
        initialLeaves = collectLeaves(mainRect);
    }

    // 2. Assign Room Types
    // Sort leaves by area (largest to smallest)
    initialLeaves.sort((a, b) => (b.w * b.h) - (a.w * a.h));
    
    // Assign types based on house needs
    const types: Room['type'][] = ['living', 'kitchen', 'bedroom', 'bathroom', 'bedroom', 'dining', 'utility'];
    
    // Duplex needs 2 set of core rooms handled specially, but we will simplify by just cycling types
    let typeIndex = 0;
    
    initialLeaves.forEach((leaf, idx) => {
        let assignedType: Room['type'] = 'bedroom';
        if (houseType === 'duplex') {
             // Basic alternating pattern for duplex halves
             assignedType = idx % 2 === 0 ? 'living' : (idx % 3 === 0 ? 'kitchen' : 'bedroom');
        } else {
             assignedType = types[typeIndex] || 'bedroom';
             if (idx === initialLeaves.length - 1 && initialLeaves.length > 2) assignedType = 'bathroom';
             typeIndex++;
        }
        
        leaf.roomType = assignedType;
        leaf.id = `${assignedType}_${idx}`;
    });

    // 3. Map to final Room objects and calculate boundaries
    initialLeaves.forEach(leaf => {
        // Transform corner (x,y) to center (x,y) for WallBuilder
        const centerX = leaf.x + leaf.w / 2;
        const centerY = leaf.y + leaf.h / 2;

        let isTopExt = false, isBottomExt = false, isLeftExt = false, isRightExt = false;

        if (houseType === 'lshaped') {
            const mainW = width * 0.6;
            const mainH = length * 0.6;
            isTopExt = isExteriorBoundary(leaf.y, -length/2);
            isLeftExt = isExteriorBoundary(leaf.x, -width/2);
            isBottomExt = isExteriorBoundary(leaf.y + leaf.h, length/2) || (leaf.x >= -width/2 + mainW - 0.1 && isExteriorBoundary(leaf.y + leaf.h, -length/2 + mainH));
            isRightExt = isExteriorBoundary(leaf.x + leaf.w, width/2) || (leaf.y <= -length/2 + mainH + 0.1 && isExteriorBoundary(leaf.x + leaf.w, -width/2 + mainW));
        } else if (houseType === 'courtyard') {
            const thick = Math.min(width, length) * 0.3;
            // Exterior bounds
            isTopExt = isExteriorBoundary(leaf.y, -length/2) || isExteriorBoundary(leaf.y + leaf.h, -length/2 + thick);
            isBottomExt = isExteriorBoundary(leaf.y + leaf.h, length/2) || isExteriorBoundary(leaf.y, length/2 - thick);
            isLeftExt = isExteriorBoundary(leaf.x, -width/2) || isExteriorBoundary(leaf.x + leaf.w, -width/2 + thick);
            isRightExt = isExteriorBoundary(leaf.x + leaf.w, width/2) || isExteriorBoundary(leaf.x, width/2 - thick);
        } else {
            // Box boundaries
            isTopExt = isExteriorBoundary(leaf.y, -length/2);
            isBottomExt = isExteriorBoundary(leaf.y + leaf.h, length/2);
            isLeftExt = isExteriorBoundary(leaf.x, -width/2);
            isRightExt = isExteriorBoundary(leaf.x + leaf.w, width/2);
        }

        rooms.push({
            id: leaf.id!,
            x: centerX,
            y: centerY,
            width: leaf.w,
            length: leaf.h,
            type: leaf.roomType!,
            color: ROOM_COLORS[leaf.roomType!] || '#ffffff',
            hasFrontDoor: leaf.roomType === 'living' && isBottomExt, // Living room bottom wall gets door
            isExterior: {
                top: isTopExt,
                bottom: isBottomExt,
                left: isLeftExt,
                right: isRightExt
            }
        });
    });

    return rooms;
}