"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

function Particles({ count = 350 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    for (let i = 0; i < count; i++) {
      const x = particles[i * 3];
      const y = particles[i * 3 + 1];
      const z = particles[i * 3 + 2];
      dummy.position.set(x, y, z);
      dummy.rotation.x = state.clock.elapsedTime * 0.05 + y * 0.5 + mouse.current.y * 0.3;
      dummy.rotation.y = state.clock.elapsedTime * 0.05 + x * 0.5 + mouse.current.x * 0.3;
      dummy.scale.setScalar(0.015 + Math.sin(state.clock.elapsedTime + i) * 0.005);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#F97316" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function FloatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[1.5, 0.5, -1]}>
        <torusKnotGeometry args={[0.4, 0.12, 100, 16]} />
        <MeshDistortMaterial color="#F97316" distort={0.3} speed={2} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.08;
      meshRef.current.rotation.z = clock.elapsedTime * 0.12;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[-1.8, -0.5, -2]}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#3B82F6" wireframe emissive="#3B82F6" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = clock.elapsedTime * 0.08;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[0, 1.5, -2.5]}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color="#A855F7" wireframe emissive="#A855F7" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[-0.5, -1.2, -1.5]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#22C55E" metalness={0.9} roughness={0.1} emissive="#22C55E" emissiveIntensity={0.15} />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.current.x * 0.3 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mouse.current.y * 0.15 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#F97316" />
      <pointLight position={[-5, -5, 5]} intensity={0.6} color="#3B82F6" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#A855F7" />
      <pointLight position={[2, -3, 2]} intensity={0.3} color="#22C55E" />
      <group ref={groupRef}>
        <Particles count={350} />
        <FloatingTorusKnot />
        <FloatingIcosahedron />
        <FloatingOctahedron />
        <FloatingSphere />
      </group>
    </>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <SceneContent />
    </Canvas>
  );
}
