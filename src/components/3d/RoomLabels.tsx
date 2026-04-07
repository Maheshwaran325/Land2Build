import { Text } from '@react-three/drei';
import { type Room } from './procedural/FloorPlan';

interface RoomLabelsProps {
    rooms: Room[];
    floorHeight: number;
    wallHeight: number;
    visible: boolean;
}

const ROOM_ICONS: Record<string, string> = {
    living: '🛋️',
    kitchen: '🍳',
    bedroom: '🛏️',
    bathroom: '🚿',
    dining: '🍽️',
    hallway: '🚶',
    utility: '🔧'
};

const ROOM_DISPLAY_NAMES: Record<string, string> = {
    living: 'Living Room',
    kitchen: 'Kitchen',
    bedroom: 'Bedroom',
    bathroom: 'Bathroom',
    dining: 'Dining Room',
    hallway: 'Hallway',
    utility: 'Utility'
};

export function RoomLabels({ rooms, floorHeight, wallHeight, visible }: RoomLabelsProps) {
    if (!visible) return null;

    return (
        <group>
            {rooms.map((room) => {
                const area = (room.width * room.length).toFixed(1);
                const displayName = ROOM_DISPLAY_NAMES[room.type] || room.type;
                const icon = ROOM_ICONS[room.type] || '📦';

                return (
                    <group key={room.id} position={[room.x, floorHeight + wallHeight + 0.8, room.y]}>
                        {/* Background pill */}
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[2.4, 0.7]} />
                            <meshBasicMaterial
                                color="#1a1a2e"
                                transparent
                                opacity={0.85}
                            />
                        </mesh>
                        {/* Rounded border effect */}
                        <mesh position={[0, 0, -0.001]}>
                            <planeGeometry args={[2.5, 0.78]} />
                            <meshBasicMaterial
                                color="#6366f1"
                                transparent
                                opacity={0.6}
                            />
                        </mesh>

                        {/* Room name */}
                        <Text
                            position={[0, 0.1, 0.01]}
                            fontSize={0.22}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            fontWeight={700}
                        >
                            {`${icon} ${displayName}`}
                        </Text>

                        {/* Area text */}
                        <Text
                            position={[0, -0.15, 0.01]}
                            fontSize={0.15}
                            color="#a5b4fc"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {`${area} m² · ${room.width.toFixed(1)}×${room.length.toFixed(1)}m`}
                        </Text>

                        {/* Connecting line down to the room */}
                        <mesh position={[0, -0.55, 0]} rotation={[0, 0, 0]}>
                            <boxGeometry args={[0.02, 0.4, 0.02]} />
                            <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
                        </mesh>

                        {/* Dot at end of line */}
                        <mesh position={[0, -0.75, 0]}>
                            <sphereGeometry args={[0.05, 8, 8]} />
                            <meshBasicMaterial color="#6366f1" transparent opacity={0.7} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

export default RoomLabels;
