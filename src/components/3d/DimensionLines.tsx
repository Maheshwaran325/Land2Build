import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

interface DimensionLinesProps {
    width: number;
    length: number;
    totalHeight: number;
    visible: boolean;
}

function DimensionArrow({
    start,
    end,
    label,
    color = '#ef4444',
}: {
    start: [number, number, number];
    end: [number, number, number];
    label: string;
    color?: string;
}) {
    const midpoint: [number, number, number] = [
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2
    ];

    const linePoints = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...start),
            new THREE.Vector3(...end)
        ]);
    }, [start, end]);

    // End caps
    const capSize = 0.3;
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const dz = end[2] - start[2];

    const startCapGeom = useMemo(() => {
        if (Math.abs(dx) > Math.abs(dz)) {
            return new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(start[0], start[1] - capSize, start[2]),
                new THREE.Vector3(start[0], start[1] + capSize, start[2])
            ]);
        } else if (Math.abs(dy) > 0.1) {
            return new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(start[0] - capSize, start[1], start[2]),
                new THREE.Vector3(start[0] + capSize, start[1], start[2])
            ]);
        } else {
            return new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(start[0], start[1] - capSize, start[2]),
                new THREE.Vector3(start[0], start[1] + capSize, start[2])
            ]);
        }
    }, [start, dx, dz, dy]);

    const endCapGeom = useMemo(() => {
        if (Math.abs(dx) > Math.abs(dz)) {
            return new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(end[0], end[1] - capSize, end[2]),
                new THREE.Vector3(end[0], end[1] + capSize, end[2])
            ]);
        } else if (Math.abs(dy) > 0.1) {
            return new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(end[0] - capSize, end[1], end[2]),
                new THREE.Vector3(end[0] + capSize, end[1], end[2])
            ]);
        } else {
            return new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(end[0], end[1] - capSize, end[2]),
                new THREE.Vector3(end[0], end[1] + capSize, end[2])
            ]);
        }
    }, [end, dx, dz, dy]);

    return (
        <group>
            {/* Main line */}
            <lineSegments geometry={linePoints}>
                <lineBasicMaterial color={color} linewidth={2} />
            </lineSegments>

            {/* Start cap */}
            <lineSegments geometry={startCapGeom}>
                <lineBasicMaterial color={color} linewidth={2} />
            </lineSegments>

            {/* End cap */}
            <lineSegments geometry={endCapGeom}>
                <lineBasicMaterial color={color} linewidth={2} />
            </lineSegments>

            {/* Label background */}
            <mesh position={midpoint}>
                <planeGeometry args={[1.6, 0.45]} />
                <meshBasicMaterial color="#1a1a2e" transparent opacity={0.9} />
            </mesh>

            {/* Label text */}
            <Text
                position={[midpoint[0], midpoint[1], midpoint[2] + 0.01]}
                fontSize={0.25}
                color={color}
                anchorX="center"
                anchorY="middle"
                fontWeight={700}
            >
                {label}
            </Text>
        </group>
    );
}

export function DimensionLines({ width, length, totalHeight, visible }: DimensionLinesProps) {
    if (!visible) return null;

    const offsetDist = 2;

    return (
        <group>
            {/* Width dimension (front) */}
            <DimensionArrow
                start={[-width / 2, -0.3, length / 2 + offsetDist]}
                end={[width / 2, -0.3, length / 2 + offsetDist]}
                label={`${width.toFixed(1)}m`}
                color="#f97316"
            />

            {/* Length dimension (side) */}
            <DimensionArrow
                start={[width / 2 + offsetDist, -0.3, -length / 2]}
                end={[width / 2 + offsetDist, -0.3, length / 2]}
                label={`${length.toFixed(1)}m`}
                color="#22c55e"
            />

            {/* Height dimension (vertical) */}
            <DimensionArrow
                start={[-width / 2 - offsetDist, 0, length / 2]}
                end={[-width / 2 - offsetDist, totalHeight, length / 2]}
                label={`${totalHeight.toFixed(1)}m`}
                color="#3b82f6"
            />

            {/* Ground area label */}
            <group position={[0, -0.28, length / 2 + offsetDist + 1.5]}>
                <mesh>
                    <planeGeometry args={[3, 0.5]} />
                    <meshBasicMaterial color="#1a1a2e" transparent opacity={0.85} />
                </mesh>
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.2}
                    color="#a78bfa"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight={600}
                >
                    {`Footprint: ${(width * length).toFixed(0)} m²`}
                </Text>
            </group>
        </group>
    );
}

export default DimensionLines;
