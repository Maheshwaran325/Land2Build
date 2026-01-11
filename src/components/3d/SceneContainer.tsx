import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Sky } from '@react-three/drei';
import { Suspense } from 'react';
import HouseModel from './HouseModel';

interface SceneContainerProps {
    width?: number;
    length?: number;
    floors?: number;
    roofType?: 'flat' | 'gable' | 'hip';
    wallColor?: string;
    roofColor?: string;
    viewMode?: 'rendered' | 'wireframe';
}

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#cccccc" wireframe />
        </mesh>
    );
}

export function SceneContainer({
    width = 10,
    length = 12,
    floors = 2,
    roofType = 'gable',
    wallColor = '#f5f0e6',
    roofColor = '#8b4513',
    viewMode = 'rendered'
}: SceneContainerProps) {
    return (
        <div className="w-full h-full min-h-[400px] bg-gradient-to-b from-sky-200 to-sky-400 rounded-lg overflow-hidden">
            <Canvas
                shadows
                camera={{ position: [20, 15, 20], fov: 45 }}
                gl={{ antialias: true, toneMappingExposure: 1.1 }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    {/* Realistic Sky */}
                    <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />

                    {/* Lighting */}
                    <ambientLight intensity={0.7} />
                    <directionalLight
                        position={[10, 20, 10]}
                        intensity={1.2}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                        shadow-bias={-0.0001}
                    />

                    {/* Environment for realistic reflections */}
                    <Environment preset="city" blur={0.8} />

                    {/* House Model */}
                    <HouseModel
                        width={width}
                        length={length}
                        floors={floors}
                        roofType={roofType}
                        wallColor={wallColor}
                        roofColor={roofColor}
                        viewMode={viewMode}
                    />

                    {/* Shadows */}
                    <ContactShadows
                        position={[0, -0.29, 0]}
                        opacity={0.4}
                        scale={50}
                        blur={2}
                    />

                    {/* Camera Controls */}
                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={10}
                        maxDistance={100}
                        maxPolarAngle={Math.PI / 2.1}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default SceneContainer;
