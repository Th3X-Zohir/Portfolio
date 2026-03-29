"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import "./TechStack.css";

const techItems = [
  { name: "TypeScript", color: "#3178C6" },
  { name: "Python", color: "#3776AB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "LangChain", color: "#6B4FF6" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Docker", color: "#2496ED" },
  { name: "Redis", color: "#DC382D" },
  { name: "GPT-4", color: "#F97316" },
  { name: "Node.js", color: "#339933" },
  { name: "FastAPI", color: "#009688" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "WebSockets", color: "#A855F7" },
  { name: "AWS", color: "#FF9900" },
  { name: "React", color: "#61DAFB" },
  { name: "MySQL", color: "#4479A1" },
];

function TechSphere({ color, position }: { color: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("work");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setIsActive(window.scrollY > rect.top - window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={isActive ? 0.3 : 0.05}
        />
      </mesh>
    </Float>
  );
}

function Pointer() {
  const ref = useRef<any>(null);
  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    ref.current.setNextKinematicTranslation({
      x: pointer.x * viewport.width / 2,
      y: pointer.y * viewport.height / 2,
      z: 0,
    });
  });
  return (
    <RigidBody ref={ref} type="kinematicPosition" colliders={false} position={[100, 100, 100]}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

function TechPhysics() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("work");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setIsActive(window.scrollY > rect.top - window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const spheres = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      color: techItems[i % techItems.length].color,
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <Physics gravity={[0, 0, 0]}>
      <Pointer />
      {spheres.map((s, i) => (
        <RigidBody
          key={i}
          position={s.position}
          linearDamping={0.75}
          angularDamping={0.15}
          colliders={false}
        >
          <BallCollider args={[s.scale]} />
          <mesh>
            <sphereGeometry args={[s.scale, 20, 20]} />
            <meshStandardMaterial
              color={s.color}
              metalness={0.8}
              roughness={0.1}
              emissive={s.color}
              emissiveIntensity={isActive ? 0.4 : 0.05}
            />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}

export default function TechStack() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);
    const onResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!isDesktop) return null;

  return (
    <section className="techstack-section" id="techstack">
      <div className="techstack-header">
        <h3 className="title techstack-label">Tech Stack</h3>
        <h2 className="techstack-title">
          The tools I<br />
          <span>work with.</span>
        </h2>
      </div>

      <Canvas
        camera={{ position: [0, 0, 20], fov: 35 }}
        style={{ width: "100%", height: "400px" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" intensity={1.5} />
        <directionalLight position={[0, 5, -4]} intensity={1} />
        <TechPhysics />
        <Environment preset="night" />
      </Canvas>
    </section>
  );
}
