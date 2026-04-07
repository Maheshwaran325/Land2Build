import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Sky, Grid, Text } from '@react-three/drei';
import { EffectComposer, Bloom, N8AO, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import HouseModel from './HouseModel';
import RoomLabels from './RoomLabels';
import DimensionLines from './DimensionLines';
import { generateFloorPlan, type HouseType } from './procedural/FloorPlan';

interface SceneContainerProps {
    width?: number;
    length?: number;
    floors?: number;
    roofType?: 'flat' | 'gable' | 'hip';
    wallColor?: string;
    roofColor?: string;
    viewMode?: 'rendered' | 'wireframe' | 'blueprint';
    designStyle?: string;
    houseType?: HouseType;
    cameraPreset?: CameraPresetType;
    showLabels?: boolean;
    showDimensions?: boolean;
    showSection?: boolean;
    isNightMode?: boolean;
}

export type CameraPresetType = 'perspective' | 'front' | 'side' | 'top' | 'walkthrough';

interface CameraPreset {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
}

function getCameraPreset(preset: CameraPresetType, width: number, length: number, floors: number): CameraPreset {
    const h = floors * 3;
    const maxDim = Math.max(width, length);
    const dist = maxDim * 1.8;

    switch (preset) {
        case 'front':
            return {
                position: [0, h / 2 + 2, dist],
                target: [0, h / 2, 0],
                fov: 40
            };
        case 'side':
            return {
                position: [dist, h / 2 + 2, 0],
                target: [0, h / 2, 0],
                fov: 40
            };
        case 'top':
            return {
                position: [0, dist * 1.5, 0.01],
                target: [0, 0, 0],
                fov: 50
            };
        case 'walkthrough':
            return {
                position: [0, 1.7, length / 2 + 5],
                target: [0, 1.7, 0],
                fov: 65
            };
        case 'perspective':
        default:
            return {
                position: [dist * 0.8, dist * 0.6, dist * 0.8],
                target: [0, h / 3, 0],
                fov: 45
            };
    }
}

// Animated camera component
function AnimatedCamera({
    preset,
    width,
    length,
    floors,
    isInitialLoad
}: {
    preset: CameraPresetType;
    width: number;
    length: number;
    floors: number;
    isInitialLoad: boolean;
}) {
    const { camera } = useThree();
    const targetRef = useRef(new THREE.Vector3());
    const isAnimatingRef = useRef(true);
    const progressRef = useRef(0);
    const prevPresetRef = useRef(preset);

    const cameraPreset = getCameraPreset(preset, width, length, floors);

    useEffect(() => {
        if (prevPresetRef.current !== preset || isInitialLoad) {
            isAnimatingRef.current = true;
            progressRef.current = 0;
            prevPresetRef.current = preset;
        }
    }, [preset, isInitialLoad]);

    useFrame((_, delta) => {
        if (!isAnimatingRef.current) return;

        progressRef.current = Math.min(progressRef.current + delta * 1.2, 1);
        const t = easeInOutCubic(progressRef.current);

        const targetPos = new THREE.Vector3(...cameraPreset.position);
        const targetLookAt = new THREE.Vector3(...cameraPreset.target);

        // Interpolate camera position
        camera.position.lerp(targetPos, t * 0.08 + 0.02);

        // Interpolate look-at target
        targetRef.current.lerp(targetLookAt, t * 0.08 + 0.02);
        camera.lookAt(targetRef.current);

        // Update FOV smoothly
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = THREE.MathUtils.lerp(camera.fov, cameraPreset.fov, 0.05);
            camera.updateProjectionMatrix();
        }

        if (progressRef.current >= 1) {
            isAnimatingRef.current = false;
        }
    });

    return null;
}

function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Section plane component
function SectionPlane({ enabled, width, height }: {
    enabled: boolean;
    width: number;
    length: number;
    height: number;
}) {
    const { gl } = useThree();

    useEffect(() => {
        if (enabled) {
            const plane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
            gl.clippingPlanes = [plane];
            gl.localClippingEnabled = true;
        } else {
            gl.clippingPlanes = [];
            gl.localClippingEnabled = false;
        }
        return () => {
            gl.clippingPlanes = [];
            gl.localClippingEnabled = false;
        };
    }, [enabled, gl]);

    if (!enabled) return null;

    return (
        <group position={[0, height / 2, 0]}>
            {/* Section plane indicator */}
            <mesh rotation={[0, 0, 0]}>
                <planeGeometry args={[width + 6, height + 2]} />
                <meshBasicMaterial
                    color="#ef4444"
                    transparent
                    opacity={0.05}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Section cut line */}
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(width + 6, height + 2)]} />
                <lineBasicMaterial color="#ef4444" transparent opacity={0.4} />
            </lineSegments>
        </group>
    );
}

// Ground grid with measurement marks
function GroundPlane({ width, length, isNight, isBlueprint }: { width: number; length: number; isNight: boolean; isBlueprint: boolean }) {
    const gridSize = Math.max(width, length) * 3;

    return (
        <group>
            {/* Main ground */}
            {!isBlueprint && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
                    <planeGeometry args={[gridSize, gridSize]} />
                    <meshStandardMaterial
                        color={isNight ? '#1a2a1a' : '#4a7c59'}
                        roughness={1}
                    />
                </mesh>
            )}

            {/* Measurement grid */}
            <Grid
                position={[0, -0.29, 0]}
                args={[gridSize, gridSize]}
                cellSize={1}
                cellThickness={isBlueprint ? 1.5 : 0.3}
                cellColor={isBlueprint ? '#004466' : (isNight ? '#2a3a2a' : '#5a8c69')}
                sectionSize={5}
                sectionThickness={isBlueprint ? 2 : 0.8}
                sectionColor={isBlueprint ? '#0088cc' : (isNight ? '#3a4a3a' : '#3d6b4a')}
                fadeDistance={gridSize}
                fadeStrength={1.5}
                infiniteGrid={false}
            />

            {/* Axis labels */}
            {!isBlueprint && [-15, -10, -5, 5, 10, 15].map(val => (
                <group key={`grid-label-${val}`}>
                    <Text
                        position={[val, -0.25, -gridSize / 2 + 1]}
                        fontSize={0.4}
                        color="#ffffff80"
                        anchorX="center"
                        anchorY="middle"
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        {`${val}m`}
                    </Text>
                </group>
            ))}
        </group>
    );
}

// Enhanced trees
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    return (
        <group position={position} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 1.2, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.18, 2.4, 8]} />
                <meshStandardMaterial color="#5d4037" roughness={0.9} />
            </mesh>
            {/* Foliage layers */}
            <mesh position={[0, 2.8, 0]} castShadow>
                <coneGeometry args={[1.2, 2, 8]} />
                <meshStandardMaterial color="#2e7d32" roughness={0.9} />
            </mesh>
            <mesh position={[0, 3.5, 0]} castShadow>
                <coneGeometry args={[0.9, 1.6, 8]} />
                <meshStandardMaterial color="#388e3c" roughness={0.9} />
            </mesh>
            <mesh position={[0, 4.1, 0]} castShadow>
                <coneGeometry args={[0.6, 1.2, 8]} />
                <meshStandardMaterial color="#43a047" roughness={0.9} />
            </mesh>
        </group>
    );
}

// Compound/boundary wall
function CompoundWall({ width, length }: { width: number; length: number }) {
    const wallH = 1.2;
    const wallT = 0.15;
    const padding = 3;
    const w = width + padding * 2;
    const l = length + padding * 2;

    return (
        <group position={[0, wallH / 2 - 0.3, 0]}>
            {/* Front wall with gate opening */}
            <mesh position={[-w / 4 - 0.5, 0, l / 2]} castShadow>
                <boxGeometry args={[w / 2 - 2, wallH, wallT]} />
                <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
            </mesh>
            <mesh position={[w / 4 + 0.5, 0, l / 2]} castShadow>
                <boxGeometry args={[w / 2 - 2, wallH, wallT]} />
                <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
            </mesh>
            {/* Gate pillars */}
            <mesh position={[-1.2, 0.15, l / 2]} castShadow>
                <boxGeometry args={[0.4, wallH + 0.3, 0.4]} />
                <meshStandardMaterial color="#bfb5a0" roughness={0.8} />
            </mesh>
            <mesh position={[1.2, 0.15, l / 2]} castShadow>
                <boxGeometry args={[0.4, wallH + 0.3, 0.4]} />
                <meshStandardMaterial color="#bfb5a0" roughness={0.8} />
            </mesh>
            {/* Back wall */}
            <mesh position={[0, 0, -l / 2]} castShadow>
                <boxGeometry args={[w, wallH, wallT]} />
                <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
            </mesh>
            {/* Side walls */}
            <mesh position={[-w / 2, 0, 0]} castShadow>
                <boxGeometry args={[wallT, wallH, l]} />
                <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
            </mesh>
            <mesh position={[w / 2, 0, 0]} castShadow>
                <boxGeometry args={[wallT, wallH, l]} />
                <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
            </mesh>
            {/* Wall cap */}
            <mesh position={[0, wallH / 2 + 0.05, -l / 2]} castShadow>
                <boxGeometry args={[w + 0.1, 0.08, wallT + 0.1]} />
                <meshStandardMaterial color="#c4b498" roughness={0.7} />
            </mesh>
        </group>
    );
}

function LoadingFallback() {
    return (
        <group>
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#6366f1" wireframe />
            </mesh>
            <Text position={[0, -2, 0]} fontSize={0.4} color="#6366f1">
                Loading 3D Model...
            </Text>
        </group>
    );
}

export function SceneContainer({
    width = 10,
    length = 12,
    floors = 2,
    roofType = 'gable',
    wallColor = '#f5f0e6',
    roofColor = '#8b4513',
    viewMode = 'rendered',
    designStyle = 'modern',
    houseType = 'standard',
    cameraPreset = 'perspective',
    showLabels = false,
    showDimensions = false,
    showSection = false,
    isNightMode = false
}: SceneContainerProps) {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const isBlueprint = viewMode === 'blueprint';

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Generate floor plans for labels
    const floorPlans = Array.from({ length: floors }).map(() =>
        generateFloorPlan(width, length, designStyle, houseType)
    );

    const totalHeight = floors * 3;
    const maxDim = Math.max(width, length);

    return (
        <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden relative"
            style={{
                background: isBlueprint ? '#020617' : (isNightMode
                    ? 'linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 50%, #0d1b2a 100%)'
                    : 'linear-gradient(180deg, #87ceeb 0%, #b8dced 40%, #e0f0ff 100%)')
            }}
        >
            <Canvas
                shadows
                camera={{
                    position: [maxDim * 2.5, maxDim * 1.5, maxDim * 2.5],
                    fov: 45,
                    near: 0.1,
                    far: 500
                }}
                gl={{
                    antialias: true,
                    toneMappingExposure: isNightMode ? 0.6 : 1.2,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    alpha: true
                }}
                dpr={[1, 2]}
            >
                <Suspense fallback={<LoadingFallback />}>
                    {/* Animated Camera */}
                    <AnimatedCamera
                        preset={cameraPreset}
                        width={width}
                        length={length}
                        floors={floors}
                        isInitialLoad={isInitialLoad}
                    />

                    {/* Sky */}
                    {!isNightMode && !isBlueprint && (
                        <Sky
                            sunPosition={[100, 30, 100]}
                            turbidity={0.3}
                            rayleigh={0.5}
                            mieCoefficient={0.005}
                            mieDirectionalG={0.8}
                        />
                    )}
                    {isNightMode && !isBlueprint && (
                        <>
                            <color attach="background" args={['#0a0a1a']} />
                            <points>
                                <bufferGeometry>
                                    <bufferAttribute
                                        attach="attributes-position"
                                        args={[(() => {
                                            const pos = new Float32Array(600);
                                            for (let i = 0; i < 600; i += 3) {
                                                pos[i] = (Math.random() - 0.5) * 200;
                                                pos[i + 1] = Math.random() * 100 + 20;
                                                pos[i + 2] = (Math.random() - 0.5) * 200;
                                            }
                                            return pos;
                                        })(), 3]}
                                    />
                                </bufferGeometry>
                                <pointsMaterial color="#ffffff" size={0.3} sizeAttenuation />
                            </points>
                        </>
                    )}

                    {/* Lighting */}
                    <ambientLight intensity={isBlueprint ? 1.0 : (isNightMode ? 0.15 : 0.5)} color={isNightMode ? '#4466aa' : '#ffffff'} />
                    {!isBlueprint && (
                        <directionalLight
                            position={isNightMode ? [5, 15, 5] : [15, 25, 15]}
                            intensity={isNightMode ? 0.3 : 1.5}
                            castShadow
                            shadow-mapSize={[4096, 4096]}
                            shadow-camera-left={-30}
                            shadow-camera-right={30}
                            shadow-camera-top={30}
                            shadow-camera-bottom={-30}
                            shadow-bias={-0.0001}
                            color={isNightMode ? '#6688cc' : '#fff5e6'}
                        />
                    )}
                    {/* Fill light */}
                    {!isBlueprint && (
                        <directionalLight
                            position={[-10, 10, -10]}
                            intensity={isNightMode ? 0.05 : 0.3}
                            color={isNightMode ? '#334466' : '#e8f0ff'}
                        />
                    )}
                    {/* Rim light */}
                    {!isBlueprint && (
                        <directionalLight
                            position={[0, 5, -20]}
                            intensity={isNightMode ? 0.1 : 0.2}
                            color="#ffd4a6"
                        />
                    )}

                    {/* Night point lights */}
                    {isNightMode && !isBlueprint && (
                        <>
                            <pointLight position={[0, 2, length / 2 + 3]} intensity={2} color="#ffaa44" distance={15} decay={2} />
                            <pointLight position={[width / 2, 3, 0]} intensity={0.8} color="#ffcc66" distance={10} decay={2} />
                        </>
                    )}

                    {/* Environment for reflections */}
                    {!isBlueprint && <Environment preset={isNightMode ? 'night' : 'city'} blur={0.8} />}

                    {/* Section Plane */}
                    <SectionPlane
                        enabled={showSection}
                        width={width}
                        length={length}
                        height={totalHeight}
                    />

                    {/* House Model */}
                    <HouseModel
                        width={width}
                        length={length}
                        floors={floors}
                        roofType={roofType}
                        wallColor={wallColor}
                        roofColor={roofColor}
                        viewMode={viewMode}
                        designStyle={designStyle}
                        houseType={houseType}
                    />

                    {/* Room Labels */}
                    {floorPlans.map((rooms, idx) => (
                        <RoomLabels
                            key={`labels-${idx}`}
                            rooms={rooms}
                            floorHeight={idx * 3}
                            wallHeight={3}
                            visible={showLabels}
                        />
                    ))}

                    {/* Dimension Lines */}
                    <DimensionLines
                        width={width}
                        length={length}
                        totalHeight={totalHeight}
                        visible={showDimensions}
                    />

                    {/* Enhanced Ground */}
                    <GroundPlane width={width} length={length} isNight={isNightMode} isBlueprint={isBlueprint} />

                    {/* Trees */}
                    {!isBlueprint && (
                        <>
                            <Tree position={[-width / 2 - 4, 0, length / 2 - 2]} scale={1} />
                            <Tree position={[width / 2 + 4, 0, -length / 2 + 1]} scale={0.8} />
                            <Tree position={[-width / 2 - 5, 0, -length / 2 - 2]} scale={1.1} />
                            <Tree position={[width / 2 + 5, 0, length / 2 - 5]} scale={0.9} />
                        </>
                    )}

                    {/* Compound Wall */}
                    {!isBlueprint && <CompoundWall width={width} length={length} />}

                    {/* Shadows */}
                    {!isBlueprint && (
                        <ContactShadows
                            position={[0, -0.29, 0]}
                            opacity={isNightMode ? 0.2 : 0.5}
                            scale={60}
                            blur={2.5}
                            far={20}
                        />
                    )}

                    {/* Post-Processing */}
                    {viewMode === 'rendered' && (
                        <EffectComposer>
                            <N8AO
                                aoRadius={0.8}
                                intensity={isNightMode ? 3 : 1.5}
                                distanceFalloff={0.5}
                            />
                            <Bloom
                                intensity={isNightMode ? 0.4 : 0.1}
                                luminanceThreshold={isNightMode ? 0.6 : 0.9}
                                luminanceSmoothing={0.4}
                                mipmapBlur
                            />
                            <ToneMapping mode={ToneMappingMode.AGX} />
                            <Vignette offset={0.3} darkness={isNightMode ? 0.7 : 0.3} />
                        </EffectComposer>
                    )}

                    {/* Camera Controls */}
                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={5}
                        maxDistance={150}
                        maxPolarAngle={Math.PI / 2.05}
                        enableDamping={true}
                        dampingFactor={0.05}
                        rotateSpeed={0.5}
                        zoomSpeed={0.8}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default SceneContainer;
