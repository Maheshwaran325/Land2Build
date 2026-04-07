export type HouseType = 'standard' | 'bungalow' | 'villa' | 'apartment' | 'courtyard' | 'duplex' | 'lshaped';

export interface Room {
    id: string;
    x: number;
    y: number;
    width: number;
    length: number;
    type: 'living' | 'kitchen' | 'bedroom' | 'bathroom' | 'dining' | 'hallway' | 'utility';
    color: string;
    hasFrontDoor?: boolean;
}

export function generateFloorPlan(width: number, length: number, designStyle: string, houseType: HouseType): Room[] {
    const rooms: Room[] = [];

    // Basic floor plan generation based on house type
    switch (houseType) {
        case 'bungalow':
            // Single floor layout
            rooms.push(
                { id: 'living', x: -width / 4, y: length / 4, width: width / 2, length: length / 2, type: 'living', color: '#f0f8ff' },
                { id: 'kitchen', x: width / 4, y: length / 4, width: width / 4, length: length / 4, type: 'kitchen', color: '#fffacd' },
                { id: 'bedroom1', x: -width / 4, y: -length / 4, width: width / 3, length: length / 3, type: 'bedroom', color: '#e6e6fa' },
                { id: 'bathroom', x: width / 4, y: -length / 4, width: width / 4, length: length / 4, type: 'bathroom', color: '#f5f5dc' }
            );
            break;

        case 'villa':
            // More spacious layout
            rooms.push(
                { id: 'living', x: 0, y: length / 3, width: width * 0.6, length: length / 3, type: 'living', color: '#f0f8ff' },
                { id: 'kitchen', x: width / 3, y: 0, width: width / 3, length: length / 3, type: 'kitchen', color: '#fffacd' },
                { id: 'dining', x: -width / 3, y: 0, width: width / 3, length: length / 3, type: 'dining', color: '#ffe4e1' },
                { id: 'bedroom1', x: -width / 3, y: -length / 3, width: width / 3, length: length / 3, type: 'bedroom', color: '#e6e6fa' },
                { id: 'bedroom2', x: width / 3, y: -length / 3, width: width / 3, length: length / 3, type: 'bedroom', color: '#dda0dd' },
                { id: 'bathroom', x: 0, y: -length / 3, width: width / 4, length: length / 4, type: 'bathroom', color: '#f5f5dc' }
            );
            break;

        case 'apartment':
            // Compact layout
            rooms.push(
                { id: 'living', x: 0, y: length / 4, width: width * 0.7, length: length / 2, type: 'living', color: '#f0f8ff' },
                { id: 'kitchen', x: width / 3, y: -length / 4, width: width / 3, length: length / 3, type: 'kitchen', color: '#fffacd' },
                { id: 'bedroom', x: -width / 4, y: -length / 4, width: width / 3, length: length / 3, type: 'bedroom', color: '#e6e6fa' },
                { id: 'bathroom', x: width / 4, y: -length / 4, width: width / 4, length: length / 4, type: 'bathroom', color: '#f5f5dc' }
            );
            break;

        case 'courtyard':
            // Open courtyard design
            rooms.push(
                { id: 'living', x: -width / 3, y: length / 4, width: width / 3, length: length / 2, type: 'living', color: '#f0f8ff' },
                { id: 'kitchen', x: width / 3, y: length / 4, width: width / 3, length: length / 3, type: 'kitchen', color: '#fffacd' },
                { id: 'bedroom1', x: -width / 3, y: -length / 4, width: width / 3, length: length / 3, type: 'bedroom', color: '#e6e6fa' },
                { id: 'bedroom2', x: width / 3, y: -length / 4, width: width / 3, length: length / 3, type: 'bedroom', color: '#dda0dd' },
                { id: 'bathroom', x: 0, y: -length / 4, width: width / 4, length: length / 4, type: 'bathroom', color: '#f5f5dc' }
            );
            break;

        case 'duplex':
            // Two units
            rooms.push(
                { id: 'living1', x: -width / 4, y: length / 4, width: width / 2, length: length / 4, type: 'living', color: '#f0f8ff' },
                { id: 'kitchen1', x: -width / 4, y: 0, width: width / 4, length: length / 4, type: 'kitchen', color: '#fffacd' },
                { id: 'bedroom1', x: width / 4, y: 0, width: width / 4, length: length / 4, type: 'bedroom', color: '#e6e6fa' },
                { id: 'living2', x: -width / 4, y: -length / 4, width: width / 2, length: length / 4, type: 'living', color: '#f0f8ff' },
                { id: 'kitchen2', x: -width / 4, y: -length / 2, width: width / 4, length: length / 4, type: 'kitchen', color: '#fffacd' },
                { id: 'bedroom2', x: width / 4, y: -length / 2, width: width / 4, length: length / 4, type: 'bedroom', color: '#dda0dd' }
            );
            break;

        case 'lshaped':
            // L-shaped layout
            rooms.push(
                { id: 'living', x: -width / 3, y: length / 4, width: width / 3, length: length / 2, type: 'living', color: '#f0f8ff' },
                { id: 'kitchen', x: width / 3, y: length / 4, width: width / 3, length: length / 3, type: 'kitchen', color: '#fffacd' },
                { id: 'bedroom', x: width / 3, y: -length / 4, width: width / 3, length: length / 3, type: 'bedroom', color: '#e6e6fa' },
                { id: 'bathroom', x: 0, y: -length / 4, width: width / 4, length: length / 4, type: 'bathroom', color: '#f5f5dc' }
            );
            break;

        default: // standard
            rooms.push(
                { id: 'living', x: 0, y: length / 4, width: width * 0.6, length: length / 2, type: 'living', color: '#f0f8ff' },
                { id: 'kitchen', x: width / 3, y: -length / 4, width: width / 3, length: length / 3, type: 'kitchen', color: '#fffacd' },
                { id: 'bedroom', x: -width / 4, y: -length / 4, width: width / 3, length: length / 3, type: 'bedroom', color: '#e6e6fa' },
                { id: 'bathroom', x: width / 4, y: -length / 4, width: width / 4, length: length / 4, type: 'bathroom', color: '#f5f5dc' }
            );
    }

    return rooms;
}