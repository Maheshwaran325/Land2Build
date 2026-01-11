import { useMemo } from 'react';
import * as THREE from 'three';

interface HouseModelProps {
    width: number;      // meters
    length: number;     // meters
    floors: number;
    roofType?: 'flat' | 'gable' | 'hip';
    wallColor?: string;
    roofColor?: string;
    viewMode?: 'rendered' | 'wireframe';
}

// Floor height in meters
const FLOOR_HEIGHT = 3;

export function HouseModel({
    width = 10,
    length = 12,
    floors = 2,
    roofType = 'gable',
    wallColor = '#f5f0e6',
    roofColor = '#8b4513',
    viewMode = 'rendered'
}: HouseModelProps) {
    const totalHeight = floors * FLOOR_HEIGHT;
    const isWireframe = viewMode === 'wireframe';

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
            <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
                <boxGeometry args={[width + 0.6, 0.3, length + 0.6]} />
                <meshStandardMaterial color="#5a5a5a" roughness={0.9} wireframe={isWireframe} />
            </mesh>

            {/* Main Building */}
            <mesh position={[0, totalHeight / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, totalHeight, length]} />
                <meshStandardMaterial color={wallColor} roughness={0.8} wireframe={isWireframe} />
            </mesh>

            {/* Floor Lines */}
            {Array.from({ length: floors - 1 }).map((_, i) => (
                <mesh key={i} position={[0, (i + 1) * FLOOR_HEIGHT, 0]} receiveShadow>
                    <boxGeometry args={[width + 0.05, 0.15, length + 0.05]} />
                    <meshStandardMaterial color="#dddddd" roughness={0.5} wireframe={isWireframe} />
                </mesh>
            ))}

            {/* Windows - Front face */}
            {Array.from({ length: floors }).map((_, floorIndex) => (
                Array.from({ length: Math.floor(width / 3) }).map((_, winIndex) => {
                    const xPos = -width / 2 + 1.5 + winIndex * 3;
                    const yPos = FLOOR_HEIGHT * floorIndex + FLOOR_HEIGHT / 2 + 0.5;
                    const zPos = length / 2;

                    return (
                        <group key={`front-${floorIndex}-${winIndex}`} position={[xPos, yPos, zPos]}>
                            {/* Glass */}
                            <mesh position={[0, 0, 0.01]}>
                                <planeGeometry args={[1.2, 1.5]} />
                                <meshStandardMaterial
                                    color="#87ceeb"
                                    roughness={0.1}
                                    metalness={0.1}
                                    transparent
                                    opacity={0.6}
                                    wireframe={isWireframe}
                                />
                            </mesh>
                            {/* Frame */}
                            <mesh position={[0, 0, 0.02]}>
                                <boxGeometry args={[1.3, 1.6, 0.05]} />
                                <meshStandardMaterial color="#333333" roughness={0.8} wireframe={isWireframe} />
                                {/* Cutout for glass visual hack not needed with simple box overlay, but let's just frame around it if we wanted real detail. 
                                    For now, just a backing frame or simple overlay. 
                                    Actually, a ring or 4 boxes is better for a frame, but let's keep it simple: 
                                    Just a slightly larger box behind? No that hides it.
                                    Let's do 4 thin boxes for frame.
                                */}
                            </mesh>
                            {/* Better Frame Implementation: 4 pieces */}
                            {/* Top */}
                            <mesh position={[0, 0.775, 0.05]}>
                                <boxGeometry args={[1.3, 0.05, 0.1]} />
                                <meshStandardMaterial color="#333" wireframe={isWireframe} />
                            </mesh>
                            {/* Bottom */}
                            <mesh position={[0, -0.775, 0.05]}>
                                <boxGeometry args={[1.3, 0.05, 0.1]} />
                                <meshStandardMaterial color="#333" wireframe={isWireframe} />
                            </mesh>
                            {/* Left */}
                            <mesh position={[-0.625, 0, 0.05]}>
                                <boxGeometry args={[0.05, 1.6, 0.1]} />
                                <meshStandardMaterial color="#333" wireframe={isWireframe} />
                            </mesh>
                            {/* Right */}
                            <mesh position={[0.625, 0, 0.05]}>
                                <boxGeometry args={[0.05, 1.6, 0.1]} />
                                <meshStandardMaterial color="#333" wireframe={isWireframe} />
                            </mesh>
                        </group>
                    )
                })
            ))}

            {/* Door on front */}
            <group position={[0, 1.1, length / 2]}>
                {/* Door Mesh */}
                <mesh position={[0, 0, 0.01]}>
                    <planeGeometry args={[1.5, 2.2]} />
                    <meshStandardMaterial color="#5c4033" roughness={0.7} wireframe={isWireframe} />
                </mesh>
                {/* Door Frame */}
                <mesh position={[0, 1.125, 0.05]}>
                    <boxGeometry args={[1.7, 0.05, 0.1]} />
                    <meshStandardMaterial color="#2d1e12" wireframe={isWireframe} />
                </mesh>
                <mesh position={[-0.775, 0, 0.05]}>
                    <boxGeometry args={[0.05, 2.25, 0.1]} />
                    <meshStandardMaterial color="#2d1e12" wireframe={isWireframe} />
                </mesh>
                <mesh position={[0.775, 0, 0.05]}>
                    <boxGeometry args={[0.05, 2.25, 0.1]} />
                    <meshStandardMaterial color="#2d1e12" wireframe={isWireframe} />
                </mesh>
                {/* Knob */}
                <mesh position={[0.6, 0, 0.05]}>
                    <sphereGeometry args={[0.05]} />
                    <meshStandardMaterial color="#gold" metalness={0.8} roughness={0.2} wireframe={isWireframe} />
                </mesh>
            </group>

            {/* Roof */}
            <mesh
                position={[0, totalHeight + (roofType === 'flat' ? 0.15 : 0), roofType === 'gable' ? -length / 2 - 0.2 : 0]}
                rotation={roofType === 'gable' ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
                geometry={roofGeometry}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={roofColor} roughness={0.9} wireframe={isWireframe} />
            </mesh>

            {/* Ground plane - Make it smaller/prettier or keep as is? 
                Let's make it a nice patch of grass.
            */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
                <circleGeometry args={[40, 64]} />
                <meshStandardMaterial color="#5d9e5a" roughness={1} wireframe={isWireframe} />
            </mesh>
        </group>
    );
}

export default HouseModel;
