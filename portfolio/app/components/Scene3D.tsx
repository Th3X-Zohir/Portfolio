"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ==========================================
   PARTICLES — mouse-reactive star field
   ========================================== */
function Particles({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport, pointer } = useThree();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sz[i] = Math.random() * 0.03 + 0.005;
    }
    return [pos, sz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.02;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05;
    // Mouse parallax
    mesh.current.rotation.x += (pointer.y * 0.1 - mesh.current.rotation.x) * 0.05;
    mesh.current.rotation.y += (pointer.x * 0.1 - mesh.current.rotation.y) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#f97316"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ==========================================
   FLOATING GEOMETRIES — rotating shapes
   ========================================== */
function FloatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;
    // Subtle mouse parallax
    meshRef.current.rotation.x += (pointer.y * 0.2 - meshRef.current.rotation.x) * 0.03;
    meshRef.current.rotation.z += (pointer.x * 0.1 - meshRef.current.rotation.z) * 0.03;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />
        <MeshDistortMaterial
          color="#F97316"
          distort={0.15}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.008;
    meshRef.current.rotation.x += 0.004;
    meshRef.current.position.x += (pointer.x * 0.15 - meshRef.current.position.x) * 0.04;
    meshRef.current.position.y += (pointer.y * 0.15 - meshRef.current.position.y) * 0.04;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, 0.5, -1]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.006;
    meshRef.current.rotation.z += 0.003;
    meshRef.current.position.x += (-pointer.x * 0.1 - meshRef.current.position.x) * 0.03;
    meshRef.current.position.y += (-pointer.y * 0.1 - meshRef.current.position.y) * 0.03;
  });

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={[-1.8, -0.8, -2]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#A855F7"
          wireframe
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.004;
    meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.002;
    meshRef.current.position.x += (pointer.x * 0.05 - meshRef.current.position.x) * 0.03;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[0, -1.5, -3]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#22C55E"
          roughness={0.05}
          metalness={0.95}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

/* ==========================================
   MAIN SCENE — exported default
   ========================================== */
export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#f97316" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#3B82F6" />
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#A855F7" />

      <Particles count={350} />
      <FloatingTorusKnot />
      <FloatingIcosahedron />
      <FloatingOctahedron />
      <FloatingSphere />
    </Canvas>
  );
}
