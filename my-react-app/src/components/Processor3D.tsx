import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshTransmissionMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { ActionState } from '../actions';

interface Processor3DProps {
    status: 'idle' | 'pending' | 'success' | 'error';
    state: ActionState;
}

export function Processor3D({ status, state }: Processor3DProps) {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    // Animation state
    const targetColor = useRef(new THREE.Color('#3b82f6'));
    const targetScale = useRef(1);
    const rotationSpeed = useRef(0.5);

    useEffect(() => {
        if (status === 'idle') {
            targetColor.current.set('#3b82f6'); // Blue
            targetScale.current = 1;
            rotationSpeed.current = 0.5;
        } else if (status === 'pending') {
            targetColor.current.set('#fbbf24'); // Yellow/Orange
            targetScale.current = 0.8;
            rotationSpeed.current = 5;
        } else if (status === 'success') {
            targetColor.current.set('#10b981'); // Green
            targetScale.current = 1.2;
            rotationSpeed.current = 0.5;
        } else if (status === 'error') {
            targetColor.current.set('#ef4444'); // Red
            targetScale.current = 0.9;
            rotationSpeed.current = 0;
        }
    }, [status]);

    useFrame((state, delta) => {
        if (!ringRef.current || !coreRef.current) return;

        // Smooth color transition
        // @ts-ignore
        ringRef.current.material.color.lerp(targetColor.current, delta * 2);
        // @ts-ignore
        coreRef.current.material.color.lerp(targetColor.current, delta * 2);

        // Rotation
        ringRef.current.rotation.x += delta * rotationSpeed.current * 0.5;
        ringRef.current.rotation.y += delta * rotationSpeed.current;

        // Pulse effect for core
        const t = state.clock.getElapsedTime();
        const pulse = Math.sin(t * (status === 'pending' ? 10 : 2)) * 0.1 + 1;
        coreRef.current.scale.setScalar(targetScale.current * pulse);
    });

    return (
        <group ref={groupRef} position={[0, 2.5, 0]} scale={0.3}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Outer Ring */}
                <mesh ref={ringRef}>
                    <torusGeometry args={[2, 0.2, 16, 100]} />
                    <meshStandardMaterial
                        color="#3b82f6"
                        emissive={status === 'pending' ? "#fbbf24" : "#000000"}
                        emissiveIntensity={status === 'pending' ? 0.5 : 0}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </mesh>

                {/* Inner Core (The Data) */}
                <mesh ref={coreRef}>
                    <icosahedronGeometry args={[1, 1]} />
                    <MeshTransmissionMaterial
                        resolution={512}
                        thickness={0.5}
                        roughness={0.2}
                        envMapIntensity={2}
                        transmission={1}
                        color="#3b82f6"
                    />
                </mesh>
            </Float>

            {/* Status Text */}
            <Text
                position={[0, -2.5, 0]}
                fontSize={0.5}
                color="#1e293b"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            >
                {status.toUpperCase()}
            </Text>

            <Text
                position={[0, -3.2, 0]}
                fontSize={0.3}
                color="#64748b"
                anchorX="center"
                anchorY="middle"
                maxWidth={4}
                textAlign="center"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            >
                {state.message}
            </Text>

            <Environment preset="city" />
            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={10} blur={2.5} far={5} />
        </group>
    );
}
