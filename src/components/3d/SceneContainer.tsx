import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import HouseModel from './HouseModel';

interface SceneContainerProps {
    width?: number;
    length?: number;
    floors?: number;
    roofType?: 'flat' | 'gable' | 'hip';
    wallColor?: string;
    roofColor?: string;
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
    roofColor = '#8b4513'
}: SceneContainerProps) {
    return (
        <div className="w-full h-full min-h-[400px] bg-gradient-to-b from-sky-200 to-sky-400 rounded-lg overflow-hidden">
            <Canvas
                shadows
                camera={{ position: [20, 15, 20], fov: 50 }}
                gl={{ antialias: true }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[10, 20, 10]}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />

                    {/* Environment for realistic reflections */}
                    <Environment preset="city" />

                    {/* House Model */}
                    <HouseModel
                        width={width}
                        length={length}
                        floors={floors}
                        roofType={roofType}
                        wallColor={wallColor}
                        roofColor={roofColor}
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
