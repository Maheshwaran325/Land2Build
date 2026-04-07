import * as THREE from 'three';
import { Edges } from '@react-three/drei';
import { type Room, type HouseType } from './FloorPlan';

interface WallBuilderProps {
    rooms: Room[];
    floorHeight: number;
    wallHeight: number;
    viewMode: 'rendered' | 'wireframe' | 'blueprint';
    wallColor?: string;
    designStyle?: string;
    houseType?: HouseType;
}

interface SmartWallProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    width: number;
    height: number;
    thickness: number;
    isExterior?: boolean;
    hasWindow?: boolean;
    hasDoor?: boolean;
    viewMode: 'rendered' | 'wireframe' | 'blueprint';
    wallColor?: string;
    designStyle?: string;
}

// Get shutter color based on design style
function getShutterColor(designStyle: string): string {
    switch (designStyle) {
        case 'traditional': return '#4a5d23'; // Dark green
        case 'colonial': return '#1a3a5c'; // Navy blue
        case 'minimalist': return '#404040'; // Dark gray
        default: return '#2d5a4a'; // Modern teal
    }
}

// Get door color based on design style
function getDoorColor(designStyle: string): { main: string; panel: string } {
    switch (designStyle) {
        case 'traditional': return { main: '#5d3a1a', panel: '#4a2d14' }; // Rich wood
        case 'colonial': return { main: '#1a1a1a', panel: '#2a2a2a' }; // Black
        case 'minimalist': return { main: '#3a3a3a', panel: '#4a4a4a' }; // Charcoal
        default: return { main: '#4a3728', panel: '#3e2e21' }; // Modern wood
    }
}

function SmartWall({ position, rotation = [0, 0, 0], width, height, thickness, isExterior, hasWindow, hasDoor, viewMode, wallColor = "#f5f5f5", designStyle = "modern" }: SmartWallProps) {
    const isWireframe = viewMode === 'wireframe';
    const isBlueprint = viewMode === 'blueprint';
    
    const exteriorColor = isExterior ? wallColor : "#fafafa";
    
    const material = isBlueprint ? (
        <meshStandardMaterial color="#001833" transparent opacity={0.65} depthWrite={false} />
    ) : (
        <meshStandardMaterial color={exteriorColor} roughness={0.85} wireframe={isWireframe} />
    );
    
    // Helper to render glowing blueprint edges
    const renderEdges = () => {
        if (!isBlueprint) return null;
        return <Edges scale={1.001} color="#00ffff" />;
    };

    const doorColors = getDoorColor(designStyle);
    const shutterColor = getShutterColor(designStyle);

    // Simple solid wall
    if (!hasWindow && !hasDoor) {
        return (
            <mesh position={position} rotation={rotation} castShadow={!isBlueprint} receiveShadow={!isBlueprint}>
                <boxGeometry args={[width, height, thickness]} />
                {material}
                {renderEdges()}
            </mesh>
        );
    }

    // Wall with Door (Bottom centered opening with decorative frame)
    if (hasDoor) {
        const doorWidth = 1.0;
        const doorHeight = 2.2;
        const sideWidth = (width - doorWidth) / 2;
        const topHeight = height - doorHeight;

        return (
            <group position={position} rotation={rotation}>
                {/* Left Side */}
                <mesh position={[-width / 2 + sideWidth / 2, 0, 0]} castShadow={!isBlueprint} receiveShadow={!isBlueprint}>
                    <boxGeometry args={[sideWidth, height, thickness]} />
                    {material}
                    {renderEdges()}
                </mesh>
                {/* Right Side */}
                <mesh position={[width / 2 - sideWidth / 2, 0, 0]} castShadow={!isBlueprint} receiveShadow={!isBlueprint}>
                    <boxGeometry args={[sideWidth, height, thickness]} />
                    {material}
                    {renderEdges()}
                </mesh>
                {/* Top Header */}
                <mesh position={[0, height / 2 - topHeight / 2, 0]} castShadow={!isBlueprint} receiveShadow={!isBlueprint}>
                    <boxGeometry args={[doorWidth, topHeight, thickness]} />
                    {material}
                    {renderEdges()}
                </mesh>

                {/* Door Frame */}
                {!isWireframe && !isBlueprint && (
                    <group position={[0, -height / 2 + doorHeight / 2, 0]}>
                        {/* Frame Left */}
                        <mesh position={[-doorWidth / 2 - 0.03, 0, 0]} castShadow>
                            <boxGeometry args={[0.06, doorHeight, thickness + 0.02]} />
                            <meshStandardMaterial color="#f0f0f0" roughness={0.5} />
                        </mesh>
                        {/* Frame Right */}
                        <mesh position={[doorWidth / 2 + 0.03, 0, 0]} castShadow>
                            <boxGeometry args={[0.06, doorHeight, thickness + 0.02]} />
                            <meshStandardMaterial color="#f0f0f0" roughness={0.5} />
                        </mesh>
                        {/* Frame Top */}
                        <mesh position={[0, doorHeight / 2 + 0.05, 0]} castShadow>
                            <boxGeometry args={[doorWidth + 0.12, 0.1, thickness + 0.02]} />
                            <meshStandardMaterial color="#f0f0f0" roughness={0.5} />
                        </mesh>
                    </group>
                )}

                {/* The Door Itself - Enhanced with style-based colors */}
                {isBlueprint ? (
                     <mesh position={[0, -height / 2 + doorHeight / 2, 0]}>
                         <boxGeometry args={[doorWidth, doorHeight, thickness/2]} />
                         <meshStandardMaterial color="#001833" transparent opacity={0.3} />
                         <Edges color="#00ccff" />
                     </mesh>
                ) : !isWireframe && (
                    <group position={[0, -height / 2 + doorHeight / 2, 0]}>
                        {/* Door Panel */}
                        <mesh castShadow>
                            <boxGeometry args={[doorWidth - 0.02, doorHeight - 0.02, thickness / 2]} />
                            <meshStandardMaterial color={doorColors.main} roughness={0.7} />
                        </mesh>
                        {/* Door Panel Details - Top */}
                        <mesh position={[0, doorHeight / 4, thickness / 4 + 0.01]} castShadow>
                            <boxGeometry args={[doorWidth * 0.6, doorHeight * 0.35, 0.02]} />
                            <meshStandardMaterial color={doorColors.panel} roughness={0.8} />
                        </mesh>
                        {/* Door Panel Details - Bottom */}
                        <mesh position={[0, -doorHeight / 4, thickness / 4 + 0.01]} castShadow>
                            <boxGeometry args={[doorWidth * 0.6, doorHeight * 0.35, 0.02]} />
                            <meshStandardMaterial color={doorColors.panel} roughness={0.8} />
                        </mesh>
                        {/* Knob */}
                        <mesh position={[0.38, 0, thickness / 2]}>
                            <sphereGeometry args={[0.04]} />
                            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
                        </mesh>
                        {/* Knob Plate */}
                        <mesh position={[0.38, 0, thickness / 4 + 0.02]}>
                            <boxGeometry args={[0.08, 0.15, 0.02]} />
                            <meshStandardMaterial color="#c9a227" metalness={0.7} roughness={0.3} />
                        </mesh>
                    </group>
                )}
            </group>
        );
    }

    // Wall with Window - Enhanced with shutters
    if (hasWindow) {
        const winWidth = 1.4;
        const winHeight = 1.3;
        const sillHeight = 0.85;

        // Parts: Bottom (Sill), Top (Header), Left, Right
        const headerHeight = height - (sillHeight + winHeight);
        const sideWidth = (width - winWidth) / 2;

        return (
            <group position={position} rotation={rotation}>
                {/* Bottom (Sill) */}
                <mesh position={[0, -height / 2 + sillHeight / 2, 0]} castShadow={!isBlueprint} receiveShadow={!isBlueprint}>
                    <boxGeometry args={[width, sillHeight, thickness]} />
                    {material}
                    {renderEdges()}
                </mesh>
                {/* Top (Header) */}
                <mesh position={[0, height / 2 - headerHeight / 2, 0]} castShadow={!isBlueprint} receiveShadow={!isBlueprint}>
                    <boxGeometry args={[width, headerHeight, thickness]} />
                    {material}
                    {renderEdges()}
                </mesh>
                {/* Left Side (between sill and header) */}
                <mesh position={[-width / 2 + sideWidth / 2, -height / 2 + sillHeight + winHeight / 2, 0]} castShadow={!isBlueprint} receiveShadow={!isBlueprint}>
                    <boxGeometry args={[sideWidth, winHeight, thickness]} />
                    {material}
                    {renderEdges()}
                </mesh>
                {/* Right Side */}
                <mesh position={[width / 2 - sideWidth / 2, -height / 2 + sillHeight + winHeight / 2, 0]} castShadow={!isBlueprint} receiveShadow={!isBlueprint}>
                    <boxGeometry args={[sideWidth, winHeight, thickness]} />
                    {material}
                    {renderEdges()}
                </mesh>

                {/* Glass Window with Grid */}
                {isBlueprint ? (
                    <mesh position={[0, -height / 2 + sillHeight + winHeight / 2, 0]}>
                         <boxGeometry args={[winWidth, winHeight, 0.05]} />
                         <meshStandardMaterial color="#001833" transparent opacity={0.1} />
                         <Edges color="#0088cc" />
                     </mesh>
                ) : !isWireframe && (
                    <group position={[0, -height / 2 + sillHeight + winHeight / 2, 0]}>
                        {/* Window Sill Ledge */}
                        <mesh position={[0, -winHeight / 2 - 0.05, thickness / 2 + 0.04]} castShadow>
                            <boxGeometry args={[winWidth + 0.2, 0.05, 0.1]} />
                            <meshStandardMaterial color="#e0e0e0" roughness={0.6} />
                        </mesh>
                        {/* Outer Frame */}
                        <mesh position={[0, 0, thickness / 4]}>
                            <boxGeometry args={[winWidth + 0.1, winHeight + 0.1, 0.04]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.5} />
                        </mesh>
                        {/* Glass - Physical material for realistic look */}
                        <mesh>
                            <boxGeometry args={[winWidth - 0.05, winHeight - 0.05, thickness / 6]} />
                            <meshPhysicalMaterial
                                color="#88c8e8"
                                transparent
                                opacity={0.35}
                                roughness={0.02}
                                metalness={0.1}
                                transmission={0.6}
                                thickness={0.05}
                                envMapIntensity={1.5}
                            />
                        </mesh>
                        {/* Interior glow (warm light behind glass) */}
                        <mesh position={[0, 0, -thickness / 4]}>
                            <boxGeometry args={[winWidth - 0.15, winHeight - 0.15, 0.01]} />
                            <meshStandardMaterial
                                color="#fff3e0"
                                emissive="#ffcc80"
                                emissiveIntensity={0.15}
                                transparent
                                opacity={0.3}
                            />
                        </mesh>
                        {/* Window Muntins (Grid) - Horizontal */}
                        <mesh position={[0, 0, thickness / 4]}>
                            <boxGeometry args={[winWidth, 0.035, 0.02]} />
                            <meshStandardMaterial color="#f5f5f5" roughness={0.4} />
                        </mesh>
                        {/* Window Muntins - Vertical */}
                        <mesh position={[0, 0, thickness / 4]}>
                            <boxGeometry args={[0.035, winHeight, 0.02]} />
                            <meshStandardMaterial color="#f5f5f5" roughness={0.4} />
                        </mesh>
                        {/* Frame outline */}
                        <lineSegments>
                            <edgesGeometry args={[new THREE.BoxGeometry(winWidth, winHeight, 0.05)]} />
                            <lineBasicMaterial color="#666" />
                        </lineSegments>
                    </group>
                )}

                {/* Shutters - Style-based color */}
                {!isWireframe && !isBlueprint && isExterior && (designStyle === 'traditional' || designStyle === 'colonial') && (
                    <>
                        <mesh position={[-winWidth / 2 - 0.18, -height / 2 + sillHeight + winHeight / 2, thickness / 2 + 0.02]} castShadow>
                            <boxGeometry args={[0.3, winHeight + 0.1, 0.04]} />
                            <meshStandardMaterial color={shutterColor} roughness={0.8} />
                        </mesh>
                        <mesh position={[winWidth / 2 + 0.18, -height / 2 + sillHeight + winHeight / 2, thickness / 2 + 0.02]} castShadow>
                            <boxGeometry args={[0.3, winHeight + 0.1, 0.04]} />
                            <meshStandardMaterial color={shutterColor} roughness={0.8} />
                        </mesh>
                    </>
                )}
            </group>
        )
    }

    return null;
}

// Enhanced Furniture Components
function Bed({ position, size = 'double', isWireframe }: { position: [number, number, number]; size?: 'single' | 'double'; isWireframe: boolean }) {
    const bedWidth = size === 'double' ? 1.8 : 1.0;
    const bedLength = 2.1;

    return (
        <group position={position}>
            {/* Bed Frame */}
            <mesh position={[0, 0.15, 0]} castShadow>
                <boxGeometry args={[bedWidth + 0.1, 0.3, bedLength + 0.1]} />
                <meshStandardMaterial color="#5d4037" roughness={0.8} wireframe={isWireframe} />
            </mesh>
            {/* Mattress */}
            <mesh position={[0, 0.4, 0]} castShadow>
                <boxGeometry args={[bedWidth, 0.2, bedLength]} />
                <meshStandardMaterial color="#e8e8e8" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            {/* Bedding/Duvet */}
            <mesh position={[0, 0.5, 0.2]} castShadow>
                <boxGeometry args={[bedWidth - 0.1, 0.15, bedLength - 0.5]} />
                <meshStandardMaterial color="#3f51b5" roughness={0.95} wireframe={isWireframe} />
            </mesh>
            {/* Pillows */}
            <mesh position={[-0.35, 0.55, -bedLength / 2 + 0.3]} castShadow>
                <boxGeometry args={[0.5, 0.15, 0.4]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            {size === 'double' && (
                <mesh position={[0.35, 0.55, -bedLength / 2 + 0.3]} castShadow>
                    <boxGeometry args={[0.5, 0.15, 0.4]} />
                    <meshStandardMaterial color="#f5f5f5" roughness={0.9} wireframe={isWireframe} />
                </mesh>
            )}
            {/* Headboard */}
            <mesh position={[0, 0.7, -bedLength / 2 - 0.05]} castShadow>
                <boxGeometry args={[bedWidth + 0.1, 0.8, 0.1]} />
                <meshStandardMaterial color="#4e342e" roughness={0.7} wireframe={isWireframe} />
            </mesh>
            {/* Nightstand */}
            <mesh position={[bedWidth / 2 + 0.35, 0.25, -bedLength / 2 + 0.3]} castShadow>
                <boxGeometry args={[0.4, 0.5, 0.4]} />
                <meshStandardMaterial color="#5d4037" roughness={0.8} wireframe={isWireframe} />
            </mesh>
            {/* Lamp */}
            {!isWireframe && (
                <group position={[bedWidth / 2 + 0.35, 0.6, -bedLength / 2 + 0.3]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.08, 0.1, 0.25, 12]} />
                        <meshStandardMaterial color="#8d6e63" roughness={0.6} />
                    </mesh>
                    <mesh position={[0, 0.2, 0]}>
                        <coneGeometry args={[0.15, 0.2, 12, 1, true]} />
                        <meshStandardMaterial color="#fff8e1" roughness={0.8} side={THREE.DoubleSide} />
                    </mesh>
                </group>
            )}
        </group>
    );
}

function KitchenCabinets({ position, width, isWireframe }: { position: [number, number, number]; width: number; isWireframe: boolean }) {
    return (
        <group position={position}>
            {/* Base Cabinets */}
            <mesh position={[0, 0.45, 0]} castShadow>
                <boxGeometry args={[width, 0.9, 0.6]} />
                <meshStandardMaterial color="#5d4037" roughness={0.7} wireframe={isWireframe} />
            </mesh>
            {/* Counter Top */}
            <mesh position={[0, 0.92, 0]} castShadow>
                <boxGeometry args={[width + 0.05, 0.04, 0.65]} />
                <meshStandardMaterial color="#9e9e9e" roughness={0.3} metalness={0.1} wireframe={isWireframe} />
            </mesh>
            {/* Upper Cabinets */}
            <mesh position={[0, 1.8, -0.05]} castShadow>
                <boxGeometry args={[width, 0.7, 0.35]} />
                <meshStandardMaterial color="#5d4037" roughness={0.7} wireframe={isWireframe} />
            </mesh>
            {/* Backsplash */}
            <mesh position={[0, 1.2, -0.28]} castShadow>
                <boxGeometry args={[width, 0.5, 0.02]} />
                <meshStandardMaterial color="#e0e0e0" roughness={0.5} wireframe={isWireframe} />
            </mesh>
            {/* Sink */}
            {!isWireframe && (
                <mesh position={[0, 0.95, 0.1]} castShadow>
                    <boxGeometry args={[0.6, 0.02, 0.4]} />
                    <meshStandardMaterial color="#b0bec5" metalness={0.8} roughness={0.2} />
                </mesh>
            )}
            {/* Faucet */}
            {!isWireframe && (
                <group position={[0, 1.1, -0.1]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
                        <meshStandardMaterial color="#90a4ae" metalness={0.9} roughness={0.1} />
                    </mesh>
                    <mesh position={[0, 0.08, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
                        <meshStandardMaterial color="#90a4ae" metalness={0.9} roughness={0.1} />
                    </mesh>
                </group>
            )}
        </group>
    );
}

function Sofa({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            {/* Sofa Base */}
            <mesh position={[0, 0.2, 0]} castShadow>
                <boxGeometry args={[2.2, 0.4, 0.9]} />
                <meshStandardMaterial color="#37474f" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            {/* Seat Cushions */}
            <mesh position={[-0.55, 0.45, 0.05]} castShadow>
                <boxGeometry args={[1, 0.15, 0.7]} />
                <meshStandardMaterial color="#455a64" roughness={0.95} wireframe={isWireframe} />
            </mesh>
            <mesh position={[0.55, 0.45, 0.05]} castShadow>
                <boxGeometry args={[1, 0.15, 0.7]} />
                <meshStandardMaterial color="#455a64" roughness={0.95} wireframe={isWireframe} />
            </mesh>
            {/* Back Rest */}
            <mesh position={[0, 0.65, -0.35]} castShadow>
                <boxGeometry args={[2.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#37474f" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            {/* Arm Rests */}
            <mesh position={[-1.05, 0.45, 0]} castShadow>
                <boxGeometry args={[0.15, 0.35, 0.9]} />
                <meshStandardMaterial color="#37474f" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            <mesh position={[1.05, 0.45, 0]} castShadow>
                <boxGeometry args={[0.15, 0.35, 0.9]} />
                <meshStandardMaterial color="#37474f" roughness={0.9} wireframe={isWireframe} />
            </mesh>
            {/* Back Cushions */}
            {!isWireframe && (
                <>
                    <mesh position={[-0.55, 0.7, -0.2]} castShadow>
                        <boxGeometry args={[0.6, 0.45, 0.15]} />
                        <meshStandardMaterial color="#546e7a" roughness={0.95} />
                    </mesh>
                    <mesh position={[0.55, 0.7, -0.2]} castShadow>
                        <boxGeometry args={[0.6, 0.45, 0.15]} />
                        <meshStandardMaterial color="#546e7a" roughness={0.95} />
                    </mesh>
                </>
            )}
        </group>
    );
}

function CoffeeTable({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            {/* Table Top */}
            <mesh position={[0, 0.35, 0]} castShadow>
                <boxGeometry args={[1, 0.05, 0.5]} />
                <meshStandardMaterial color="#5d4037" roughness={0.6} wireframe={isWireframe} />
            </mesh>
            {/* Legs */}
            {[[-0.4, -0.2], [0.4, -0.2], [-0.4, 0.2], [0.4, 0.2]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.15, z]} castShadow>
                    <boxGeometry args={[0.05, 0.35, 0.05]} />
                    <meshStandardMaterial color="#4e342e" roughness={0.7} wireframe={isWireframe} />
                </mesh>
            ))}
            {/* Items on table */}
            {!isWireframe && (
                <>
                    <mesh position={[-0.2, 0.4, 0]} castShadow>
                        <boxGeometry args={[0.2, 0.02, 0.3]} />
                        <meshStandardMaterial color="#1565c0" roughness={0.8} />
                    </mesh>
                    <mesh position={[0.2, 0.42, 0.1]} castShadow>
                        <cylinderGeometry args={[0.04, 0.035, 0.1, 12]} />
                        <meshStandardMaterial color="#fff8e1" roughness={0.6} />
                    </mesh>
                </>
            )}
        </group>
    );
}

function TVStand({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            {/* Stand */}
            <mesh position={[0, 0.25, 0]} castShadow>
                <boxGeometry args={[1.5, 0.5, 0.4]} />
                <meshStandardMaterial color="#263238" roughness={0.7} wireframe={isWireframe} />
            </mesh>
            {/* TV Screen */}
            <mesh position={[0, 0.85, -0.05]} castShadow>
                <boxGeometry args={[1.3, 0.75, 0.05]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.3} wireframe={isWireframe} />
            </mesh>
            {/* TV Screen Display */}
            {!isWireframe && (
                <mesh position={[0, 0.85, 0.01]}>
                    <boxGeometry args={[1.2, 0.67, 0.01]} />
                    <meshStandardMaterial color="#1e88e5" roughness={0.2} />
                </mesh>
            )}
        </group>
    );
}

function Toilet({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            {/* Base */}
            <mesh position={[0, 0.2, 0]} castShadow>
                <boxGeometry args={[0.4, 0.4, 0.55]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} wireframe={isWireframe} />
            </mesh>
            {/* Seat */}
            <mesh position={[0, 0.42, 0.05]} castShadow>
                <boxGeometry args={[0.38, 0.05, 0.45]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.4} wireframe={isWireframe} />
            </mesh>
            {/* Tank */}
            <mesh position={[0, 0.5, -0.22]} castShadow>
                <boxGeometry args={[0.35, 0.35, 0.15]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} wireframe={isWireframe} />
            </mesh>
            {/* Lid */}
            <mesh position={[0, 0.7, -0.22]} castShadow>
                <boxGeometry args={[0.35, 0.03, 0.15]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.4} wireframe={isWireframe} />
            </mesh>
        </group>
    );
}

function Sink({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            {/* Pedestal */}
            <mesh position={[0, 0.35, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.15, 0.7, 12]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} wireframe={isWireframe} />
            </mesh>
            {/* Basin */}
            <mesh position={[0, 0.75, 0]} castShadow>
                <boxGeometry args={[0.5, 0.15, 0.4]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} wireframe={isWireframe} />
            </mesh>
            {/* Faucet */}
            {!isWireframe && (
                <group position={[0, 0.9, -0.12]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
                        <meshStandardMaterial color="#bdbdbd" metalness={0.9} roughness={0.1} />
                    </mesh>
                    <mesh position={[0, 0.05, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
                        <meshStandardMaterial color="#bdbdbd" metalness={0.9} roughness={0.1} />
                    </mesh>
                </group>
            )}
            {/* Mirror */}
            <mesh position={[0, 1.3, -0.18]} castShadow>
                <boxGeometry args={[0.6, 0.8, 0.02]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.5} roughness={0.1} wireframe={isWireframe} />
            </mesh>
        </group>
    );
}

function DiningTable({ position, isWireframe }: { position: [number, number, number]; isWireframe: boolean }) {
    return (
        <group position={position}>
            {/* Table Top */}
            <mesh position={[0, 0.75, 0]} castShadow>
                <boxGeometry args={[1.6, 0.05, 0.9]} />
                <meshStandardMaterial color="#6d4c41" roughness={0.6} wireframe={isWireframe} />
            </mesh>
            {/* Legs */}
            {[[-0.7, -0.35], [0.7, -0.35], [-0.7, 0.35], [0.7, 0.35]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.35, z]} castShadow>
                    <boxGeometry args={[0.08, 0.7, 0.08]} />
                    <meshStandardMaterial color="#5d4037" roughness={0.7} wireframe={isWireframe} />
                </mesh>
            ))}
            {/* Chairs */}
            {[[-0.5, 0.55], [0.5, 0.55], [-0.5, -0.55], [0.5, -0.55]].map(([x, z], i) => (
                <group key={`chair-${i}`} position={[x, 0, z]} rotation={[0, z > 0 ? Math.PI : 0, 0]}>
                    {/* Seat */}
                    <mesh position={[0, 0.45, 0]} castShadow>
                        <boxGeometry args={[0.4, 0.05, 0.4]} />
                        <meshStandardMaterial color="#5d4037" roughness={0.7} wireframe={isWireframe} />
                    </mesh>
                    {/* Back */}
                    <mesh position={[0, 0.7, -0.18]} castShadow>
                        <boxGeometry args={[0.38, 0.5, 0.04]} />
                        <meshStandardMaterial color="#5d4037" roughness={0.7} wireframe={isWireframe} />
                    </mesh>
                    {/* Legs */}
                    {[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([lx, lz], j) => (
                        <mesh key={j} position={[lx, 0.2, lz]} castShadow>
                            <boxGeometry args={[0.04, 0.45, 0.04]} />
                            <meshStandardMaterial color="#4e342e" roughness={0.7} wireframe={isWireframe} />
                        </mesh>
                    ))}
                </group>
            ))}
        </group>
    );
}

export function WallBuilder({ rooms, floorHeight, wallHeight, viewMode, wallColor = '#f5f5f5', designStyle = 'modern', houseType: _houseType = 'standard' }: WallBuilderProps) {
    const isWireframe = viewMode === 'wireframe';
    const isBlueprint = viewMode === 'blueprint';
    const WALL_THICKNESS = 0.2;
    const INT_WALL_THICKNESS = 0.1;

    return (
        <group position={[0, floorHeight, 0]}>
            {rooms.map((room) => {
                const topThick = room.isExterior.top ? WALL_THICKNESS : INT_WALL_THICKNESS;
                const botThick = room.isExterior.bottom ? WALL_THICKNESS : INT_WALL_THICKNESS;
                const leftThick = room.isExterior.left ? WALL_THICKNESS : INT_WALL_THICKNESS;
                const rightThick = room.isExterior.right ? WALL_THICKNESS : INT_WALL_THICKNESS;

                return (
                    <group key={`room-${room.id}`} position={[room.x, wallHeight / 2, room.y]}>
                        {/* Floor Slab with Texture Pattern */}
                        <mesh position={[0, -wallHeight / 2 + 0.05, 0]} receiveShadow={!isBlueprint}>
                            <boxGeometry args={[room.width, 0.1, room.length]} />
                            {isBlueprint ? (
                                <meshStandardMaterial color="#001020" />
                            ) : (
                                <meshStandardMaterial
                                    color={
                                        room.type === 'bathroom' ? '#b8d4d8' :
                                            room.type === 'kitchen' ? '#e8e0d0' :
                                                room.type === 'bedroom' ? '#c9b99a' :
                                                    room.type === 'living' ? '#d4c4a8' :
                                                        '#f0e6d3'
                                    }
                                    roughness={
                                        room.type === 'bathroom' ? 0.3 :
                                            room.type === 'kitchen' ? 0.4 :
                                                room.type === 'bedroom' ? 0.85 :
                                                    0.7
                                    }
                                    wireframe={isWireframe}
                                />
                            )}
                            {isBlueprint && <Edges color="#004466" />}
                        </mesh>

                        {/* Floor Pattern Overlay */}
                        {!isWireframe && !isBlueprint && room.type === 'kitchen' && (
                            <group position={[0, -wallHeight / 2 + 0.11, 0]}>
                                {Array.from({ length: Math.floor(room.width / 0.6) }).map((_, i) =>
                                    Array.from({ length: Math.floor(room.length / 0.6) }).map((_, j) => (
                                        <mesh key={`tile-${i}-${j}`} position={[(i - room.width / 1.2) * 0.6, 0, (j - room.length / 1.2) * 0.6]} receiveShadow>
                                            <boxGeometry args={[0.55, 0.01, 0.55]} />
                                            <meshStandardMaterial color={(i + j) % 2 === 0 ? '#f5f5f5' : '#e0e0e0'} roughness={0.4} />
                                        </mesh>
                                    ))
                                )}
                            </group>
                        )}

                        {/* Ceiling Slab */}
                        <mesh position={[0, wallHeight / 2 - 0.05, 0]}>
                            <boxGeometry args={[room.width, 0.1, room.length]} />
                            <meshStandardMaterial color="#fafafa" roughness={1} wireframe={isWireframe} />
                        </mesh>

                        {/* Ceiling Light - with glow effect - hide in blueprint */}
                        {!isWireframe && !isBlueprint && (
                            <group position={[0, wallHeight / 2 - 0.15, 0]}>
                                {/* Light fixture */}
                                <mesh>
                                    <cylinderGeometry args={[0.2, 0.25, 0.05, 16]} />
                                    <meshStandardMaterial color="#e0e0e0" roughness={0.5} metalness={0.3} />
                                </mesh>
                                {/* Bulb glow */}
                                <mesh position={[0, -0.04, 0]}>
                                    <sphereGeometry args={[0.08, 12, 12]} />
                                    <meshStandardMaterial
                                        color="#fff8e1"
                                        emissive="#ffcc00"
                                        emissiveIntensity={0.4}
                                        transparent
                                        opacity={0.9}
                                    />
                                </mesh>
                                <pointLight intensity={0.4} color="#fff5e6" distance={6} decay={2} />
                            </group>
                        )}

                        {/* Back Wall (North/Top, -Z) */}
                        <SmartWall
                            position={[0, 0, -room.length / 2]}
                            width={room.width}
                            height={wallHeight}
                            thickness={topThick}
                            isExterior={room.isExterior.top}
                            hasWindow={room.isExterior.top && room.type !== 'bathroom'}
                            rotation={[0, 0, 0]}
                            viewMode={viewMode || 'rendered'}
                            wallColor={wallColor}
                            designStyle={designStyle}
                        />

                        {/* Front Wall (South/Bottom, +Z) */}
                        <SmartWall
                            position={[0, 0, room.length / 2]}
                            width={room.width}
                            height={wallHeight}
                            thickness={botThick}
                            isExterior={room.isExterior.bottom}
                            hasWindow={room.isExterior.bottom && room.type !== 'bathroom'}
                            hasDoor={room.hasFrontDoor || (!room.isExterior.bottom && room.type !== 'bathroom')}
                            rotation={[0, 0, 0]}
                            viewMode={viewMode || 'rendered'}
                            wallColor={wallColor}
                            designStyle={designStyle}
                        />

                        {/* Left Wall (West, -X) */}
                        <SmartWall
                            position={[-room.width / 2, 0, 0]}
                            width={room.length + (topThick + botThick)/2}
                            height={wallHeight}
                            thickness={leftThick}
                            isExterior={room.isExterior.left}
                            hasWindow={room.isExterior.left && room.type !== 'bathroom'}
                            rotation={[0, Math.PI / 2, 0]}
                            viewMode={viewMode || 'rendered'}
                            wallColor={wallColor}
                            designStyle={designStyle}
                        />

                        {/* Right Wall (East, +X) */}
                        <SmartWall
                            position={[room.width / 2, 0, 0]}
                            width={room.length + (topThick + botThick)/2}
                            height={wallHeight}
                            thickness={rightThick}
                            isExterior={room.isExterior.right}
                            hasWindow={room.isExterior.right && room.type === 'bathroom'}
                            hasDoor={!room.isExterior.right && room.type === 'bathroom'}
                            rotation={[0, Math.PI / 2, 0]}
                            viewMode={viewMode || 'rendered'}
                            wallColor={wallColor}
                            designStyle={designStyle}
                        />

                        {/* Enhanced Furniture by Room Type */}
                        {!isWireframe && (
                            <>
                                {room.type === 'bedroom' && (
                                    <>
                                        <Bed
                                            position={[0, -wallHeight / 2 + 0.1, -room.length / 4]}
                                            size={room.id === 'master-bed' ? 'double' : 'single'}
                                            isWireframe={isWireframe}
                                        />
                                        {/* Wardrobe */}
                                        <mesh position={[room.width / 2 - 0.4, -wallHeight / 2 + 1, 0]} castShadow>
                                            <boxGeometry args={[0.6, 2, 1.2]} />
                                            <meshStandardMaterial color="#6d4c41" roughness={0.7} />
                                        </mesh>
                                    </>
                                )}

                                {room.type === 'kitchen' && (
                                    <KitchenCabinets
                                        position={[0, -wallHeight / 2 + 0.1, -room.length / 2 + 0.35]}
                                        width={room.width * 0.9}
                                        isWireframe={isWireframe}
                                    />
                                )}

                                {room.type === 'living' && (
                                    <>
                                        <Sofa position={[0, -wallHeight / 2 + 0.1, room.length / 4]} isWireframe={isWireframe} />
                                        <CoffeeTable position={[0, -wallHeight / 2 + 0.1, -0.2]} isWireframe={isWireframe} />
                                        <TVStand position={[0, -wallHeight / 2 + 0.1, -room.length / 2 + 0.5]} isWireframe={isWireframe} />
                                    </>
                                )}

                                {room.type === 'bathroom' && (
                                    <>
                                        <Toilet position={[-room.width / 4, -wallHeight / 2 + 0.1, -room.length / 3]} isWireframe={isWireframe} />
                                        <Sink position={[room.width / 4, -wallHeight / 2 + 0.1, -room.length / 3]} isWireframe={isWireframe} />
                                        {/* Bathtub */}
                                        <mesh position={[0, -wallHeight / 2 + 0.3, room.length / 3]} castShadow>
                                            <boxGeometry args={[0.7, 0.5, 1.5]} />
                                            <meshStandardMaterial color="#ffffff" roughness={0.3} />
                                        </mesh>
                                    </>
                                )}

                                {room.type === 'dining' && (
                                    <DiningTable position={[0, -wallHeight / 2 + 0.1, 0]} isWireframe={isWireframe} />
                                )}

                                {/* Baseboards */}
                                <group position={[0, -wallHeight / 2 + 0.15, 0]}>
                                    <mesh position={[0, 0, -room.length / 2 + 0.02]}>
                                        <boxGeometry args={[room.width, 0.1, 0.02]} />
                                        <meshStandardMaterial color="#e0e0e0" roughness={0.6} />
                                    </mesh>
                                    <mesh position={[0, 0, room.length / 2 - 0.02]}>
                                        <boxGeometry args={[room.width, 0.1, 0.02]} />
                                        <meshStandardMaterial color="#e0e0e0" roughness={0.6} />
                                    </mesh>
                                    <mesh position={[-room.width / 2 + 0.02, 0, 0]}>
                                        <boxGeometry args={[0.02, 0.1, room.length]} />
                                        <meshStandardMaterial color="#e0e0e0" roughness={0.6} />
                                    </mesh>
                                    <mesh position={[room.width / 2 - 0.02, 0, 0]}>
                                        <boxGeometry args={[0.02, 0.1, room.length]} />
                                        <meshStandardMaterial color="#e0e0e0" roughness={0.6} />
                                    </mesh>
                                </group>
                            </>
                        )}

                    </group>
                )
            })}
        </group>
    );
}
