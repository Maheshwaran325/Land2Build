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
    viewMode?: 'rendered' | 'wireframe' | 'blueprint';
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
    const porchDepth = houseType === 'bungalow' ? 3.5 : 2.5;
    const porchWidth = houseType === 'bungalow' ? Math.min(width * 0.6, 8) : Math.min(width * 0.4, 4);
    const pillarSize = 0.2;

    return (
        <group position={[0, floorHeight, length / 2 + porchDepth / 2]}>
            {/* Porch Floor (wood texture look) */}
            <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
                <boxGeometry args={[porchWidth + 0.4, 0.2, porchDepth]} />
                <meshStandardMaterial color="#8b7355" roughness={0.7} wireframe={isWireframe} />
            </mesh>

            {/* Steps with gradient */}
            {[0, 1, 2].map((step) => (
                <mesh key={step} position={[0, -0.15 - step * 0.2, porchDepth / 2 + 0.3 + step * 0.3]} receiveShadow castShadow>
                    <boxGeometry args={[porchWidth * 0.8, 0.15, 0.3]} />
                    <meshStandardMaterial
                        color={`hsl(30, 20%, ${28 - step * 3}%)`}
                        roughness={0.8}
                        wireframe={isWireframe}
                    />
                </mesh>
            ))}

            {/* Pillars - more detailed */}
            {[-porchWidth / 2 + pillarSize, porchWidth / 2 - pillarSize].map((x, i) => (
                <group key={i} position={[x, 0, porchDepth / 2 - 0.3]}>
                    {/* Base */}
                    <mesh position={[0, 0.3, 0]} castShadow>
                        <boxGeometry args={[pillarSize + 0.12, 0.22, pillarSize + 0.12]} />
                        <meshStandardMaterial color="#f0f0f0" roughness={0.5} wireframe={isWireframe} />
                    </mesh>
                    {/* Column */}
                    <mesh position={[0, 1.4, 0]} castShadow>
                        <cylinderGeometry args={[pillarSize / 2, pillarSize / 2 + 0.02, 2, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={0.4} wireframe={isWireframe} />
                    </mesh>
                    {/* Capital */}
                    <mesh position={[0, 2.5, 0]} castShadow>
                        <boxGeometry args={[pillarSize + 0.16, 0.22, pillarSize + 0.16]} />
                        <meshStandardMaterial color="#f0f0f0" roughness={0.5} wireframe={isWireframe} />
                    </mesh>
                </group>
            ))}

            {/* Porch Roof */}
            <mesh position={[0, 2.7, 0]} receiveShadow castShadow>
                <boxGeometry args={[porchWidth + 0.8, 0.18, porchDepth + 0.4]} />
                <meshStandardMaterial color="#5a4035" roughness={0.8} wireframe={isWireframe} />
            </mesh>

            {/* Railing with balusters */}
            {[-porchWidth / 2 + 0.05, porchWidth / 2 - 0.05].map((x, i) => (
                <group key={`rail-${i}`}>
                    {/* Top rail */}
                    <mesh position={[x, 0.95, 0]} castShadow>
                        <boxGeometry args={[0.06, 0.06, porchDepth - 0.4]} />
                        <meshStandardMaterial color="#f5f5f5" roughness={0.6} wireframe={isWireframe} />
                    </mesh>
                    {/* Bottom rail */}
                    <mesh position={[x, 0.3, 0]} castShadow>
                        <boxGeometry args={[0.06, 0.06, porchDepth - 0.4]} />
                        <meshStandardMaterial color="#f5f5f5" roughness={0.6} wireframe={isWireframe} />
                    </mesh>
                    {/* Balusters */}
                    {!isWireframe && Array.from({ length: Math.floor((porchDepth - 0.4) / 0.25) }).map((_, j) => (
                        <mesh key={`bal-${i}-${j}`} position={[x, 0.625, -porchDepth / 2 + 0.4 + j * 0.25]} castShadow>
                            <boxGeometry args={[0.03, 0.6, 0.03]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.5} />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* Front railing */}
            <mesh position={[0, 0.95, porchDepth / 2 - 0.2]} castShadow>
                <boxGeometry args={[porchWidth - 1.5, 0.06, 0.06]} />
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
    const trimH = 0.15;
    const trimD = 0.06;
    const trimColor = "#e8e4e0";

    return (
        <group>
            {/* Bottom Trim - all 4 sides */}
            {[
                { pos: [0, 0.1, length / 2 + trimD] as [number, number, number], size: [width + 0.1, trimH, trimD] as [number, number, number] },
                { pos: [0, 0.1, -length / 2 - trimD] as [number, number, number], size: [width + 0.1, trimH, trimD] as [number, number, number] },
                { pos: [width / 2 + trimD, 0.1, 0] as [number, number, number], size: [trimD, trimH, length + 0.1] as [number, number, number] },
                { pos: [-width / 2 - trimD, 0.1, 0] as [number, number, number], size: [trimD, trimH, length + 0.1] as [number, number, number] },
            ].map((t, i) => (
                <mesh key={`btrim-${i}`} position={t.pos} castShadow>
                    <boxGeometry args={t.size} />
                    <meshStandardMaterial color={trimColor} roughness={0.6} wireframe={isWireframe} />
                </mesh>
            ))}

            {/* Top Trim / Cornice */}
            {[
                { pos: [0, height - 0.1, length / 2 + trimD] as [number, number, number], size: [width + 0.2, 0.22, 0.1] as [number, number, number] },
                { pos: [0, height - 0.1, -length / 2 - trimD] as [number, number, number], size: [width + 0.2, 0.22, 0.1] as [number, number, number] },
                { pos: [width / 2 + trimD, height - 0.1, 0] as [number, number, number], size: [0.1, 0.22, length + 0.2] as [number, number, number] },
                { pos: [-width / 2 - trimD, height - 0.1, 0] as [number, number, number], size: [0.1, 0.22, length + 0.2] as [number, number, number] },
            ].map((t, i) => (
                <mesh key={`ttrim-${i}`} position={t.pos} castShadow>
                    <boxGeometry args={t.size} />
                    <meshStandardMaterial color="#f5f5f5" roughness={0.5} wireframe={isWireframe} />
                </mesh>
            ))}
        </group>
    );
}

// Outdoor Light with glow
function WallLight({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            {/* Mounting plate */}
            <mesh castShadow>
                <boxGeometry args={[0.15, 0.2, 0.05]} />
                <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} wireframe={isWireframe} />
            </mesh>
            {/* Lantern body */}
            <mesh position={[0, 0, 0.12]} castShadow>
                <boxGeometry args={[0.12, 0.25, 0.12]} />
                <meshPhysicalMaterial
                    color="#1a1a1a"
                    metalness={0.7}
                    roughness={0.4}
                    wireframe={isWireframe}
                />
            </mesh>
            {/* Light glow */}
            {!isWireframe && (
                <>
                    <mesh position={[0, 0, 0.12]}>
                        <boxGeometry args={[0.08, 0.18, 0.08]} />
                        <meshStandardMaterial
                            color="#fff8e1"
                            emissive="#ffcc00"
                            emissiveIntensity={0.5}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                    <pointLight position={[0, 0, 0.2]} intensity={0.5} color="#fff8e1" distance={4} decay={2} />
                </>
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
            {/* Soil */}
            {!isWireframe && (
                <mesh position={[0, 0.08, 0]}>
                    <boxGeometry args={[width - 0.04, 0.06, 0.21]} />
                    <meshStandardMaterial color="#3e2723" roughness={1} />
                </mesh>
            )}
            {!isWireframe && Array.from({ length: Math.floor(width / 0.18) }).map((_, i) => (
                <group key={i}>
                    {/* Stems */}
                    <mesh position={[(i - width / 0.36) * 0.18, 0.18, 0]} castShadow>
                        <cylinderGeometry args={[0.01, 0.01, 0.15, 4]} />
                        <meshStandardMaterial color="#2e7d32" roughness={0.9} />
                    </mesh>
                    {/* Flowers */}
                    <mesh position={[(i - width / 0.36) * 0.18, 0.26, 0]} castShadow>
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshStandardMaterial
                            color={['#e91e63', '#ff5722', '#ffeb3b', '#9c27b0', '#f44336', '#ff9800'][i % 6]}
                            roughness={0.8}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// Walkway with stone pattern
function Walkway({ startZ, endZ, isWireframe }: { startZ: number; endZ: number; isWireframe: boolean }) {
    const pathLength = endZ - startZ;
    const stoneCount = Math.floor(pathLength / 1.0);

    return (
        <group position={[0, -0.28, startZ + pathLength / 2]}>
            {/* Path base */}
            <mesh receiveShadow>
                <boxGeometry args={[1.8, 0.06, pathLength]} />
                <meshStandardMaterial color="#9e9e9e" roughness={0.85} wireframe={isWireframe} />
            </mesh>
            {/* Pavers */}
            {!isWireframe && Array.from({ length: stoneCount }).map((_, i) => (
                <mesh key={i} position={[(i % 2 === 0 ? 0.2 : -0.2), 0.04, -pathLength / 2 + 0.5 + i * 1.0]} receiveShadow>
                    <boxGeometry args={[0.55, 0.03, 0.85]} />
                    <meshStandardMaterial color={i % 3 === 0 ? '#8e8e8e' : '#757575'} roughness={0.92} />
                </mesh>
            ))}
            {/* Path border */}
            {!isWireframe && (
                <>
                    <mesh position={[0.95, 0.02, 0]} receiveShadow>
                        <boxGeometry args={[0.08, 0.08, pathLength]} />
                        <meshStandardMaterial color="#616161" roughness={0.9} />
                    </mesh>
                    <mesh position={[-0.95, 0.02, 0]} receiveShadow>
                        <boxGeometry args={[0.08, 0.08, pathLength]} />
                        <meshStandardMaterial color="#616161" roughness={0.9} />
                    </mesh>
                </>
            )}
        </group>
    );
}

// Bush
function Bush({ position, scale = 1, isWireframe }: { position: [number, number, number]; scale?: number; isWireframe: boolean }) {
    return (
        <group position={position} scale={scale}>
            <mesh position={[0, 0.3, 0]} castShadow>
                <sphereGeometry args={[0.5, 12, 12]} />
                <meshStandardMaterial color="#4caf50" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            <mesh position={[0.3, 0.25, 0.2]} castShadow>
                <sphereGeometry args={[0.35, 12, 12]} />
                <meshStandardMaterial color="#66bb6a" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            <mesh position={[-0.25, 0.2, -0.15]} castShadow>
                <sphereGeometry args={[0.4, 12, 12]} />
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
                    {[0, 1, 2, 3].map((i) => (
                        <mesh key={i} position={[0, 0.8 - i * 0.5, 0.06]} castShadow>
                            <boxGeometry args={[2.3, 0.4, 0.02]} />
                            <meshStandardMaterial color="#4e342e" roughness={0.7} />
                        </mesh>
                    ))}
                    {/* Handle */}
                    <mesh position={[0.8, -0.2, 0.08]}>
                        <boxGeometry args={[0.06, 0.15, 0.04]} />
                        <meshStandardMaterial color="#9e9e9e" metalness={0.8} roughness={0.2} />
                    </mesh>
                </>
            )}
        </group>
    );
}

// Courtyard Center
function CourtyardCenter({ width, length, isWireframe }: { width: number; length: number; isWireframe: boolean }) {
    return (
        <group position={[0, -0.25, 0]}>
            <mesh receiveShadow>
                <boxGeometry args={[width, 0.1, length]} />
                <meshStandardMaterial color="#d4c4a8" roughness={0.8} wireframe={isWireframe} />
            </mesh>
            {!isWireframe && (
                <>
                    {/* Fountain base */}
                    <mesh position={[0, 0.15, 0]} castShadow>
                        <cylinderGeometry args={[0.8, 1, 0.3, 16]} />
                        <meshStandardMaterial color="#9e9e9e" roughness={0.5} />
                    </mesh>
                    {/* Water */}
                    <mesh position={[0, 0.32, 0]}>
                        <cylinderGeometry args={[0.75, 0.75, 0.02, 16]} />
                        <meshPhysicalMaterial
                            color="#4fc3f7"
                            transparent
                            opacity={0.6}
                            roughness={0.05}
                            metalness={0.1}
                        />
                    </mesh>
                    {/* Center piece */}
                    <mesh position={[0, 0.55, 0]} castShadow>
                        <cylinderGeometry args={[0.08, 0.12, 0.45, 12]} />
                        <meshStandardMaterial color="#757575" roughness={0.4} />
                    </mesh>
                </>
            )}
        </group>
    );
}

// Chimney
function Chimney({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            <mesh castShadow>
                <boxGeometry args={[0.6, 1.8, 0.6]} />
                <meshStandardMaterial color="#8d6e63" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            {/* Cap */}
            <mesh position={[0, 1, 0]} castShadow>
                <boxGeometry args={[0.7, 0.1, 0.7]} />
                <meshStandardMaterial color="#795548" roughness={0.8} wireframe={isWireframe} />
            </mesh>
            {/* Flue */}
            {!isWireframe && (
                <mesh position={[0, 0.85, 0]}>
                    <boxGeometry args={[0.3, 0.15, 0.3]} />
                    <meshStandardMaterial color="#424242" roughness={0.7} />
                </mesh>
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
    const effectiveFloors = houseType === 'bungalow' ? 1 :
        houseType === 'apartment' ? Math.max(floors, 3) :
            floors;

    const totalHeight = effectiveFloors * FLOOR_HEIGHT;
    const isWireframe = viewMode === 'wireframe';
    const isBlueprint = viewMode === 'blueprint';

    const floorPlans = useMemo(() => {
        return Array.from({ length: effectiveFloors }).map(() =>
            generateFloorPlan(width, length, designStyle, houseType)
        );
    }, [width, length, effectiveFloors, designStyle, houseType]);

    const roofGeometry = useMemo(() => {
        const effectiveRoofType = houseType === 'apartment' ? 'flat' : roofType;

        if (effectiveRoofType === 'flat') {
            return new THREE.BoxGeometry(width + 0.4, 0.3, length + 0.4);
        }

        if (effectiveRoofType === 'gable') {
            const shape = new THREE.Shape();
            const roofHeight = width * 0.35;
            shape.moveTo(-width / 2 - 0.4, 0);
            shape.lineTo(0, roofHeight);
            shape.lineTo(width / 2 + 0.4, 0);
            shape.lineTo(-width / 2 - 0.4, 0);

            return new THREE.ExtrudeGeometry(shape, {
                depth: length + 0.8,
                bevelEnabled: false
            });
        }

        // Hip roof
        const roofHeight = Math.min(width, length) * 0.3;
        const geometry = new THREE.ConeGeometry(
            Math.sqrt(width * width + length * length) / 2 + 0.5,
            roofHeight,
            4
        );
        geometry.rotateY(Math.PI / 4);
        return geometry;
    }, [width, length, roofType, houseType]);

    const effectiveRoofType = houseType === 'apartment' ? 'flat' : roofType;

    return (
        <group>
            {/* Foundation - hidden in blueprint */}
            {!isBlueprint && (
                <>
                    <mesh position={[0, -0.2, 0]} receiveShadow castShadow>
                        <boxGeometry args={[width + 0.8, 0.2, length + 0.8]} />
                        <meshStandardMaterial color="#3a3a3a" roughness={0.95} wireframe={isWireframe} />
                    </mesh>
                    <mesh position={[0, -0.08, 0]} receiveShadow castShadow>
                        <boxGeometry args={[width + 0.5, 0.15, length + 0.5]} />
                        <meshStandardMaterial color="#4a4a4a" roughness={0.9} wireframe={isWireframe} />
                    </mesh>
                    {/* Foundation step */}
                    <mesh position={[0, 0.0, 0]} receiveShadow castShadow>
                        <boxGeometry args={[width + 0.3, 0.05, length + 0.3]} />
                        <meshStandardMaterial color="#5a5a5a" roughness={0.85} wireframe={isWireframe} />
                    </mesh>
                </>
            )}

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

            {/* Roof with overhang - hidden in blueprint mode to show internal rooms */}
            {!isBlueprint && (
                <mesh
                    position={[0, totalHeight + (effectiveRoofType === 'flat' ? 0.15 : 0), effectiveRoofType === 'gable' ? -length / 2 - 0.4 : 0]}
                    rotation={effectiveRoofType === 'gable' ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
                    geometry={roofGeometry}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial
                        color={roofColor}
                        roughness={0.85}
                        wireframe={isWireframe}
                    />
                </mesh>
            )}

            {/* Roof Edge Trim / Fascia - hidden in blueprint */}
            {effectiveRoofType !== 'flat' && !isBlueprint && (
                <group position={[0, totalHeight, 0]}>
                    {/* Front fascia */}
                    <mesh position={[0, 0.08, length / 2 + 0.35]} castShadow>
                        <boxGeometry args={[width + 0.8, 0.28, 0.12]} />
                        <meshStandardMaterial color="#e0d5c5" roughness={0.6} wireframe={isWireframe} />
                    </mesh>
                    {/* Back fascia */}
                    <mesh position={[0, 0.08, -length / 2 - 0.35]} castShadow>
                        <boxGeometry args={[width + 0.8, 0.28, 0.12]} />
                        <meshStandardMaterial color="#e0d5c5" roughness={0.6} wireframe={isWireframe} />
                    </mesh>
                    {/* Gutter */}
                    {!isWireframe && (
                        <>
                            <mesh position={[0, -0.05, length / 2 + 0.4]} castShadow>
                                <boxGeometry args={[width + 0.9, 0.08, 0.06]} />
                                <meshStandardMaterial color="#78909c" metalness={0.6} roughness={0.3} />
                            </mesh>
                            {/* Downpipe */}
                            <mesh position={[width / 2 + 0.35, -totalHeight / 2 + 0.1, length / 2 + 0.42]} castShadow>
                                <cylinderGeometry args={[0.04, 0.04, totalHeight, 8]} />
                                <meshStandardMaterial color="#78909c" metalness={0.6} roughness={0.3} />
                            </mesh>
                        </>
                    )}
                </group>
            )}

            {/* Flat roof parapet */}
            {effectiveRoofType === 'flat' && !isWireframe && !isBlueprint && (
                <group position={[0, totalHeight + 0.3, 0]}>
                    {[
                        [0, 0, length / 2 + 0.15, width + 0.4, 0.25, 0.08],
                        [0, 0, -length / 2 - 0.15, width + 0.4, 0.25, 0.08],
                        [width / 2 + 0.15, 0, 0, 0.08, 0.25, length + 0.4],
                        [-width / 2 - 0.15, 0, 0, 0.08, 0.25, length + 0.4],
                    ].map((p, i) => (
                        <mesh key={`parapet-${i}`} position={[p[0] as number, p[1] as number, p[2] as number]} castShadow>
                            <boxGeometry args={[p[3] as number, p[4] as number, p[5] as number]} />
                            <meshStandardMaterial color="#e0d5c5" roughness={0.7} />
                        </mesh>
                    ))}
                </group>
            )}

            {/* Chimney for gable/hip roof */}
            {effectiveRoofType !== 'flat' && houseType !== 'apartment' && !isBlueprint && (
                <Chimney
                    position={[width / 4, totalHeight + width * 0.2, -length / 4]}
                    isWireframe={isWireframe}
                />
            )}

            {/* Everything else is mostly exterior props, hide deeply in blueprint mode */}
            {!isBlueprint && (
                <>
                    <Porch width={width} length={length} floorHeight={0} isWireframe={isWireframe} houseType={houseType} />

                    {houseType === 'villa' && (
                        <GarageDoor position={[width / 2 - 1.5, FLOOR_HEIGHT / 2, length / 2 + 0.1]} isWireframe={isWireframe} />
                    )}

                    {houseType === 'courtyard' && (
                        <CourtyardCenter width={width * 0.35} length={length * 0.35} isWireframe={isWireframe} />
                    )}

                    <WallLight position={[width * 0.2, FLOOR_HEIGHT * 0.7, length / 2 + 0.08]} isWireframe={isWireframe} />
                    <WallLight position={[-width * 0.2, FLOOR_HEIGHT * 0.7, length / 2 + 0.08]} isWireframe={isWireframe} />
                    <WallLight position={[width / 2 + 0.08, FLOOR_HEIGHT * 0.7, 0]} isWireframe={isWireframe} />
                    <WallLight position={[-width / 2 - 0.08, FLOOR_HEIGHT * 0.7, 0]} isWireframe={isWireframe} />

                    <FlowerBox position={[-width / 2 - 0.15, FLOOR_HEIGHT * 0.3, length / 6]} width={1.2} isWireframe={isWireframe} />
                    <FlowerBox position={[width / 2 + 0.15, FLOOR_HEIGHT * 0.3, -length / 6]} width={1.2} isWireframe={isWireframe} />

                    <Walkway startZ={length / 2 + 3} endZ={length / 2 + 10} isWireframe={isWireframe} />

                    <Bush position={[-width / 2 - 1, 0, length / 2 + 0.5]} scale={0.8} isWireframe={isWireframe} />
                    <Bush position={[width / 2 + 1, 0, length / 2 + 0.5]} scale={0.8} isWireframe={isWireframe} />
                    <Bush position={[-width / 2 - 1.5, 0, -length / 2]} scale={0.6} isWireframe={isWireframe} />
                    <Bush position={[width / 2 + 1.5, 0, -length / 2]} scale={0.7} isWireframe={isWireframe} />
                    <Bush position={[0, 0, -length / 2 - 1]} scale={0.9} isWireframe={isWireframe} />
                    <Bush position={[-width / 4 - 1, 0, length / 2 + 2]} scale={0.5} isWireframe={isWireframe} />
                    <Bush position={[width / 4 + 1, 0, length / 2 + 2]} scale={0.5} isWireframe={isWireframe} />

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 + 3, -0.29, length / 4]} receiveShadow>
                        <planeGeometry args={[4, 7]} />
                        <meshStandardMaterial color="#7a7a7a" roughness={0.92} wireframe={isWireframe} />
                    </mesh>
                    {!isWireframe && (
                        <>
                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 + 1.05, -0.28, length / 4]} receiveShadow>
                                <planeGeometry args={[0.1, 7]} />
                                <meshStandardMaterial color="#616161" roughness={0.9} />
                            </mesh>
                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 + 4.95, -0.28, length / 4]} receiveShadow>
                                <planeGeometry args={[0.1, 7]} />
                                <meshStandardMaterial color="#616161" roughness={0.9} />
                            </mesh>
                        </>
                    )}
                </>
            )}
        </group>
    );
}

export default HouseModel;
