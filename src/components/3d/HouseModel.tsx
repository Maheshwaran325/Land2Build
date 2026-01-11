import { useMemo } from 'react';
import * as THREE from 'three';

interface HouseModelProps {
    width: number;      // meters
    length: number;     // meters
    floors: number;
    roofType?: 'flat' | 'gable' | 'hip';
    wallColor?: string;
    roofColor?: string;
}

// Floor height in meters
const FLOOR_HEIGHT = 3;

export function HouseModel({
    width = 10,
    length = 12,
    floors = 2,
    roofType = 'gable',
    wallColor = '#f5f0e6',
    roofColor = '#8b4513'
}: HouseModelProps) {
    const totalHeight = floors * FLOOR_HEIGHT;

    // Create roof geometry based on type
    const roofGeometry = useMemo(() => {
        if (roofType === 'flat') {
            return new THREE.BoxGeometry(width + 0.4, 0.3, length + 0.4);
        }

        if (roofType === 'gable') {
            // Triangular prism for gable roof
            const shape = new THREE.Shape();
            const roofHeight = width * 0.3;
            shape.moveTo(-width / 2 - 0.2, 0);
            shape.lineTo(0, roofHeight);
            shape.lineTo(width / 2 + 0.2, 0);
            shape.lineTo(-width / 2 - 0.2, 0);

            const extrudeSettings = {
                depth: length + 0.4,
                bevelEnabled: false
            };
            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }

        // Hip roof (pyramid-like)
        const roofHeight = Math.min(width, length) * 0.25;
        const geometry = new THREE.ConeGeometry(
            Math.sqrt(width * width + length * length) / 2 + 0.3,
            roofHeight,
            4
        );
        geometry.rotateY(Math.PI / 4);
        return geometry;
    }, [width, length, roofType]);

    return (
        <group>
            {/* Foundation/Base */}
            <mesh position={[0, -0.15, 0]}>
                <boxGeometry args={[width + 0.6, 0.3, length + 0.6]} />
                <meshStandardMaterial color="#4a4a4a" />
            </mesh>

            {/* Main Building */}
            <mesh position={[0, totalHeight / 2, 0]}>
                <boxGeometry args={[width, totalHeight, length]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>

            {/* Floor Lines */}
            {Array.from({ length: floors - 1 }).map((_, i) => (
                <mesh key={i} position={[0, (i + 1) * FLOOR_HEIGHT, 0]}>
                    <boxGeometry args={[width + 0.05, 0.1, length + 0.05]} />
                    <meshStandardMaterial color="#888888" />
                </mesh>
            ))}

            {/* Windows - Front face */}
            {Array.from({ length: floors }).map((_, floorIndex) => (
                Array.from({ length: Math.floor(width / 3) }).map((_, winIndex) => (
                    <mesh
                        key={`front-${floorIndex}-${winIndex}`}
                        position={[
                            -width / 2 + 1.5 + winIndex * 3,
                            FLOOR_HEIGHT * floorIndex + FLOOR_HEIGHT / 2 + 0.5,
                            length / 2 + 0.01
                        ]}
                    >
                        <planeGeometry args={[1.2, 1.5]} />
                        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} />
                    </mesh>
                ))
            ))}

            {/* Door on front */}
            <mesh position={[0, 1.1, length / 2 + 0.01]}>
                <planeGeometry args={[1.5, 2.2]} />
                <meshStandardMaterial color="#5c4033" />
            </mesh>

            {/* Roof */}
            <mesh
                position={[0, totalHeight + (roofType === 'flat' ? 0.15 : 0), roofType === 'gable' ? -length / 2 - 0.2 : 0]}
                rotation={roofType === 'gable' ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
                geometry={roofGeometry}
            >
                <meshStandardMaterial color={roofColor} />
            </mesh>

            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#228B22" />
            </mesh>
        </group>
    );
}

export default HouseModel;
