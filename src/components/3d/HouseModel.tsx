import { useMemo } from 'react';
import * as THREE from 'three';
import { generateFloorPlan, type HouseType } from './procedural/FloorPlan';
import { WallBuilder } from './procedural/WallBuilder';

interface HouseModelProps {
    width: number;      // meters
    length: number;     // meters
    floors: number;
    roofType?: 'flat' | 'gable' | 'hip';
    wallColor?: string;
    roofColor?: string;
    viewMode?: 'rendered' | 'wireframe';
    designStyle?: string;
    houseType?: HouseType;
}

// Floor height in meters
const FLOOR_HEIGHT = 3;

// Porch Component - Adapts to house type
function Porch({ width, length, floorHeight, isWireframe, houseType }: {
    width: number;
    length: number;
    floorHeight: number;
    isWireframe: boolean;
    houseType: HouseType;
}) {
    // Bungalow gets a larger porch
    const porchDepth = houseType === 'bungalow' ? 3.5 : 2.5;
    const porchWidth = houseType === 'bungalow' ? Math.min(width * 0.6, 8) : Math.min(width * 0.4, 4);
    const pillarSize = 0.2;

    return (
        <group position={[0, floorHeight, length / 2 + porchDepth / 2]}>
            {/* Porch Floor */}
            <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
                <boxGeometry args={[porchWidth + 0.4, 0.2, porchDepth]} />
                <meshStandardMaterial color="#8b7355" roughness={0.7} wireframe={isWireframe} />
            </mesh>

            {/* Steps */}
            {[0, 1, 2].map((step) => (
                <mesh key={step} position={[0, -0.15 - step * 0.2, porchDepth / 2 + 0.3 + step * 0.3]} receiveShadow castShadow>
                    <boxGeometry args={[porchWidth * 0.8, 0.15, 0.3]} />
                    <meshStandardMaterial color="#6b5b45" roughness={0.8} wireframe={isWireframe} />
                </mesh>
            ))}

            {/* Pillars */}
            {[-porchWidth / 2 + pillarSize, porchWidth / 2 - pillarSize].map((x, i) => (
                <group key={i} position={[x, 0, porchDepth / 2 - 0.3]}>
                    <mesh position={[0, 0.3, 0]} castShadow>
                        <boxGeometry args={[pillarSize + 0.1, 0.2, pillarSize + 0.1]} />
                        <meshStandardMaterial color="#f0f0f0" roughness={0.6} wireframe={isWireframe} />
                    </mesh>
                    <mesh position={[0, 1.4, 0]} castShadow>
                        <cylinderGeometry args={[pillarSize / 2, pillarSize / 2 + 0.02, 2, 12]} />
                        <meshStandardMaterial color="#ffffff" roughness={0.5} wireframe={isWireframe} />
                    </mesh>
                    <mesh position={[0, 2.5, 0]} castShadow>
                        <boxGeometry args={[pillarSize + 0.15, 0.2, pillarSize + 0.15]} />
                        <meshStandardMaterial color="#f0f0f0" roughness={0.6} wireframe={isWireframe} />
                    </mesh>
                </group>
            ))}

            {/* Porch Roof */}
            <mesh position={[0, 2.7, 0]} receiveShadow castShadow>
                <boxGeometry args={[porchWidth + 0.8, 0.15, porchDepth + 0.4]} />
                <meshStandardMaterial color="#5a4035" roughness={0.8} wireframe={isWireframe} />
            </mesh>

            {/* Railing */}
            {[-porchWidth / 2 + 0.05, porchWidth / 2 - 0.05].map((x, i) => (
                <mesh key={`rail-${i}`} position={[x, 0.5, 0]} castShadow>
                    <boxGeometry args={[0.08, 0.8, porchDepth - 0.4]} />
                    <meshStandardMaterial color="#f5f5f5" roughness={0.6} wireframe={isWireframe} />
                </mesh>
            ))}

            <mesh position={[0, 0.95, 0]} castShadow>
                <boxGeometry args={[porchWidth, 0.1, 0.08]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.6} wireframe={isWireframe} />
            </mesh>
        </group>
    );
}

// Wall Trim Component
function WallTrim({ width, length, height, isWireframe }: {
    width: number;
    length: number;
    height: number;
    isWireframe: boolean;
}) {
    const trimHeight = 0.15;
    const trimDepth = 0.05;
    const trimColor = "#e8e4e0";

    return (
        <group>
            {/* Bottom Trim */}
            <mesh position={[0, 0.1, length / 2 + trimDepth]} castShadow>
                <boxGeometry args={[width + 0.1, trimHeight, trimDepth]} />
                <meshStandardMaterial color={trimColor} roughness={0.6} wireframe={isWireframe} />
            </mesh>
            <mesh position={[0, 0.1, -length / 2 - trimDepth]} castShadow>
                <boxGeometry args={[width + 0.1, trimHeight, trimDepth]} />
                <meshStandardMaterial color={trimColor} roughness={0.6} wireframe={isWireframe} />
            </mesh>
            <mesh position={[width / 2 + trimDepth, 0.1, 0]} castShadow>
                <boxGeometry args={[trimDepth, trimHeight, length + 0.1]} />
                <meshStandardMaterial color={trimColor} roughness={0.6} wireframe={isWireframe} />
            </mesh>
            <mesh position={[-width / 2 - trimDepth, 0.1, 0]} castShadow>
                <boxGeometry args={[trimDepth, trimHeight, length + 0.1]} />
                <meshStandardMaterial color={trimColor} roughness={0.6} wireframe={isWireframe} />
            </mesh>

            {/* Top Trim */}
            <mesh position={[0, height - 0.1, length / 2 + trimDepth]} castShadow>
                <boxGeometry args={[width + 0.2, 0.2, 0.08]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.5} wireframe={isWireframe} />
            </mesh>
            <mesh position={[0, height - 0.1, -length / 2 - trimDepth]} castShadow>
                <boxGeometry args={[width + 0.2, 0.2, 0.08]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.5} wireframe={isWireframe} />
            </mesh>
            <mesh position={[width / 2 + trimDepth, height - 0.1, 0]} castShadow>
                <boxGeometry args={[0.08, 0.2, length + 0.2]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.5} wireframe={isWireframe} />
            </mesh>
            <mesh position={[-width / 2 - trimDepth, height - 0.1, 0]} castShadow>
                <boxGeometry args={[0.08, 0.2, length + 0.2]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.5} wireframe={isWireframe} />
            </mesh>
        </group>
    );
}

// Outdoor Light
function WallLight({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            <mesh castShadow>
                <boxGeometry args={[0.15, 0.2, 0.05]} />
                <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} wireframe={isWireframe} />
            </mesh>
            <mesh position={[0, 0, 0.12]} castShadow>
                <boxGeometry args={[0.12, 0.25, 0.12]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} wireframe={isWireframe} />
            </mesh>
            {!isWireframe && (
                <pointLight position={[0, 0, 0.15]} intensity={0.3} color="#fff8e1" distance={3} />
            )}
        </group>
    );
}

// Flower Box
function FlowerBox({ position, width, isWireframe }: { position: [number, number, number]; width: number; isWireframe: boolean }) {
    return (
        <group position={position}>
            <mesh castShadow>
                <boxGeometry args={[width, 0.2, 0.25]} />
                <meshStandardMaterial color="#5d4037" roughness={0.8} wireframe={isWireframe} />
            </mesh>
            {!isWireframe && Array.from({ length: Math.floor(width / 0.15) }).map((_, i) => (
                <mesh key={i} position={[(i - width / 0.3) * 0.15, 0.15, 0]} castShadow>
                    <sphereGeometry args={[0.08, 6, 6]} />
                    <meshStandardMaterial color={['#e91e63', '#ff5722', '#ffeb3b', '#9c27b0'][i % 4]} roughness={0.8} />
                </mesh>
            ))}
        </group>
    );
}

// Walkway
function Walkway({ startZ, endZ, isWireframe }: { startZ: number; endZ: number; isWireframe: boolean }) {
    const pathLength = endZ - startZ;
    const stoneCount = Math.floor(pathLength / 1.2);

    return (
        <group position={[0, -0.28, startZ + pathLength / 2]}>
            <mesh receiveShadow>
                <boxGeometry args={[1.5, 0.05, pathLength]} />
                <meshStandardMaterial color="#9e9e9e" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            {!isWireframe && Array.from({ length: stoneCount }).map((_, i) => (
                <mesh key={i} position={[(i % 2 === 0 ? 0.2 : -0.2), 0.03, -pathLength / 2 + 0.6 + i * 1.2]} receiveShadow>
                    <boxGeometry args={[0.5, 0.02, 0.8]} />
                    <meshStandardMaterial color="#757575" roughness={0.95} />
                </mesh>
            ))}
        </group>
    );
}

// Bush
function Bush({ position, scale = 1, isWireframe }: { position: [number, number, number]; scale?: number; isWireframe: boolean }) {
    return (
        <group position={position} scale={scale}>
            <mesh position={[0, 0.3, 0]} castShadow>
                <sphereGeometry args={[0.5, 8, 8]} />
                <meshStandardMaterial color="#4caf50" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            <mesh position={[0.3, 0.25, 0.2]} castShadow>
                <sphereGeometry args={[0.35, 8, 8]} />
                <meshStandardMaterial color="#66bb6a" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            <mesh position={[-0.25, 0.2, -0.15]} castShadow>
                <sphereGeometry args={[0.4, 8, 8]} />
                <meshStandardMaterial color="#81c784" roughness={0.9} wireframe={isWireframe} />
            </mesh>
        </group>
    );
}

// Garage Door (for Villa)
function GarageDoor({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            <mesh castShadow>
                <boxGeometry args={[2.5, 2.2, 0.1]} />
                <meshStandardMaterial color="#5d4037" roughness={0.8} wireframe={isWireframe} />
            </mesh>
            {!isWireframe && (
                <>
                    {/* Garage door panels */}
                    {[0, 1, 2, 3].map((i) => (
                        <mesh key={i} position={[0, 0.8 - i * 0.5, 0.06]} castShadow>
                            <boxGeometry args={[2.3, 0.4, 0.02]} />
                            <meshStandardMaterial color="#4e342e" roughness={0.7} />
                        </mesh>
                    ))}
                </>
            )}
        </group>
    );
}

// Courtyard Center (for Courtyard house)
function CourtyardCenter({ width, length, isWireframe }: { width: number; length: number; isWireframe: boolean }) {
    return (
        <group position={[0, -0.25, 0]}>
            {/* Courtyard floor - different texture */}
            <mesh receiveShadow>
                <boxGeometry args={[width, 0.1, length]} />
                <meshStandardMaterial color="#d4c4a8" roughness={0.8} wireframe={isWireframe} />
            </mesh>
            {/* Central feature - small garden or fountain */}
            {!isWireframe && (
                <>
                    <mesh position={[0, 0.15, 0]} castShadow>
                        <cylinderGeometry args={[0.8, 1, 0.3, 16]} />
                        <meshStandardMaterial color="#9e9e9e" roughness={0.6} />
                    </mesh>
                    <mesh position={[0, 0.4, 0]} castShadow>
                        <sphereGeometry args={[0.3, 12, 12]} />
                        <meshStandardMaterial color="#4caf50" roughness={0.9} />
                    </mesh>
                </>
            )}
        </group>
    );
}

export function HouseModel({
    width = 10,
    length = 12,
    floors = 2,
    roofType = 'gable',
    wallColor = '#f5f0e6',
    roofColor = '#8b4513',
    viewMode = 'rendered',
    designStyle = 'modern',
    houseType = 'standard'
}: HouseModelProps) {
    // Adjust floors based on house type
    const effectiveFloors = houseType === 'bungalow' ? 1 :
        houseType === 'apartment' ? Math.max(floors, 3) :
            floors;

    const totalHeight = effectiveFloors * FLOOR_HEIGHT;
    const isWireframe = viewMode === 'wireframe';

    // Generate Layout with house type
    const floorPlans = useMemo(() => {
        return Array.from({ length: effectiveFloors }).map(() =>
            generateFloorPlan(width, length, designStyle, houseType)
        );
    }, [width, length, effectiveFloors, designStyle, houseType]);

    // Create roof geometry
    const roofGeometry = useMemo(() => {
        // Apartment always has flat roof
        const effectiveRoofType = houseType === 'apartment' ? 'flat' : roofType;

        if (effectiveRoofType === 'flat') {
            return new THREE.BoxGeometry(width + 0.4, 0.3, length + 0.4);
        }

        if (effectiveRoofType === 'gable') {
            const shape = new THREE.Shape();
            const roofHeight = width * 0.35;
            shape.moveTo(-width / 2 - 0.3, 0);
            shape.lineTo(0, roofHeight);
            shape.lineTo(width / 2 + 0.3, 0);
            shape.lineTo(-width / 2 - 0.3, 0);

            return new THREE.ExtrudeGeometry(shape, {
                depth: length + 0.6,
                bevelEnabled: false
            });
        }

        // Hip roof
        const roofHeight = Math.min(width, length) * 0.3;
        const geometry = new THREE.ConeGeometry(
            Math.sqrt(width * width + length * length) / 2 + 0.4,
            roofHeight,
            4
        );
        geometry.rotateY(Math.PI / 4);
        return geometry;
    }, [width, length, roofType, houseType]);

    const effectiveRoofType = houseType === 'apartment' ? 'flat' : roofType;

    return (
        <group>
            {/* Foundation */}
            <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
                <boxGeometry args={[width + 0.8, 0.3, length + 0.8]} />
                <meshStandardMaterial color="#4a4a4a" roughness={0.95} wireframe={isWireframe} />
            </mesh>
            <mesh position={[0, -0.05, 0]} receiveShadow castShadow>
                <boxGeometry args={[width + 0.5, 0.1, length + 0.5]} />
                <meshStandardMaterial color="#5a5a5a" roughness={0.9} wireframe={isWireframe} />
            </mesh>

            {/* Floors with rooms */}
            {floorPlans.map((rooms, index) => (
                <WallBuilder
                    key={index}
                    rooms={rooms}
                    floorHeight={index * FLOOR_HEIGHT}
                    wallHeight={FLOOR_HEIGHT}
                    viewMode={viewMode || 'rendered'}
                    wallColor={wallColor}
                    designStyle={designStyle}
                    houseType={houseType}
                />
            ))}

            {/* Wall Trim */}
            {Array.from({ length: effectiveFloors }).map((_, i) => (
                <group key={`trim-${i}`} position={[0, i * FLOOR_HEIGHT, 0]}>
                    <WallTrim width={width} length={length} height={FLOOR_HEIGHT} isWireframe={isWireframe} />
                </group>
            ))}

            {/* Roof */}
            <mesh
                position={[0, totalHeight + (effectiveRoofType === 'flat' ? 0.15 : 0), effectiveRoofType === 'gable' ? -length / 2 - 0.3 : 0]}
                rotation={effectiveRoofType === 'gable' ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
                geometry={roofGeometry}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={roofColor} roughness={0.85} wireframe={isWireframe} />
            </mesh>

            {/* Roof Edge Trim */}
            {effectiveRoofType !== 'flat' && (
                <group position={[0, totalHeight, 0]}>
                    <mesh position={[0, 0.05, length / 2 + 0.25]} castShadow>
                        <boxGeometry args={[width + 0.6, 0.25, 0.1]} />
                        <meshStandardMaterial color="#e0d5c5" roughness={0.7} wireframe={isWireframe} />
                    </mesh>
                    <mesh position={[0, 0.05, -length / 2 - 0.25]} castShadow>
                        <boxGeometry args={[width + 0.6, 0.25, 0.1]} />
                        <meshStandardMaterial color="#e0d5c5" roughness={0.7} wireframe={isWireframe} />
                    </mesh>
                </group>
            )}

            {/* Porch */}
            <Porch width={width} length={length} floorHeight={0} isWireframe={isWireframe} houseType={houseType} />

            {/* Villa-specific: Garage Door */}
            {houseType === 'villa' && (
                <GarageDoor position={[width / 2 - 1.5, FLOOR_HEIGHT / 2, length / 2 + 0.1]} isWireframe={isWireframe} />
            )}

            {/* Courtyard-specific: Central courtyard */}
            {houseType === 'courtyard' && (
                <CourtyardCenter width={width * 0.35} length={length * 0.35} isWireframe={isWireframe} />
            )}

            {/* Outdoor Lights */}
            <WallLight position={[width * 0.15, FLOOR_HEIGHT * 0.7, length / 2 + 0.08]} isWireframe={isWireframe} />
            <WallLight position={[-width * 0.15, FLOOR_HEIGHT * 0.7, length / 2 + 0.08]} isWireframe={isWireframe} />

            {/* Flower Boxes */}
            <FlowerBox position={[-width / 2 - 0.15, FLOOR_HEIGHT * 0.3, 0]} width={1.2} isWireframe={isWireframe} />
            <FlowerBox position={[width / 2 + 0.15, FLOOR_HEIGHT * 0.3, 0]} width={1.2} isWireframe={isWireframe} />

            {/* Walkway */}
            <Walkway startZ={length / 2 + 3} endZ={length / 2 + 10} isWireframe={isWireframe} />

            {/* Bushes */}
            <Bush position={[-width / 2 - 1, 0, length / 2 + 0.5]} scale={0.8} isWireframe={isWireframe} />
            <Bush position={[width / 2 + 1, 0, length / 2 + 0.5]} scale={0.8} isWireframe={isWireframe} />
            <Bush position={[-width / 2 - 1.5, 0, -length / 2]} scale={0.6} isWireframe={isWireframe} />
            <Bush position={[width / 2 + 1.5, 0, -length / 2]} scale={0.7} isWireframe={isWireframe} />
            <Bush position={[0, 0, -length / 2 - 1]} scale={0.9} isWireframe={isWireframe} />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
                <circleGeometry args={[50, 64]} />
                <meshStandardMaterial color="#4a7c59" roughness={1} wireframe={isWireframe} />
            </mesh>

            {/* Driveway */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 + 3, -0.29, length / 4]} receiveShadow>
                <planeGeometry args={[4, 6]} />
                <meshStandardMaterial color="#7a7a7a" roughness={0.95} wireframe={isWireframe} />
            </mesh>
        </group>
    );
}

export default HouseModel;
