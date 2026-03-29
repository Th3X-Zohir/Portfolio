"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
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

const sphereData = Array.from({ length: 30 }, (_, i) => ({
  color: techItems[i % techItems.length].color,
  position: [
    (Math.random() - 0.5) * 14,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 6,
  ] as [number, number, number],
  scale: 0.25 + Math.random() * 0.45,
  rotSpeed: 0.1 + Math.random() * 0.3,
}));

function TechSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("work");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setIsActive(window.scrollY > rect.top - window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.1 - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (mouse.current.y * 0.05 - groupRef.current.rotation.x) * 0.03;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = sphereData[i];
      mesh.rotation.y += delta * s.rotSpeed;
      mesh.rotation.x += delta * s.rotSpeed * 0.6;
      const bob = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.3) * 0.1;
      mesh.position.y = s.position[1] + bob;
    });
  });

  return (
    <group ref={groupRef}>
      {sphereData.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={s.position}
          scale={s.scale}
        >
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial
            color={s.color}
            metalness={0.8}
            roughness={0.15}
            emissive={s.color}
            emissiveIntensity={isActive ? 0.35 : 0.08}
          />
        </mesh>
      ))}
    </group>
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
    <section className="techstack-section" id="techstack" aria-labelledby="techstack-heading">
      <div className="techstack-header">
        <h3 className="title techstack-label">Tech Stack</h3>
        <h2 className="techstack-title" id="techstack-heading">
          The tools I<br />
          <span>work with.</span>
        </h2>
      </div>

      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        style={{ width: "100%", height: "400px" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        aria-hidden="true"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-6, -4, 4]} intensity={0.8} color="#F97316" />
        <pointLight position={[0, 6, -4]} intensity={0.5} color="#A855F7" />
        <pointLight position={[-4, -6, 2]} intensity={0.4} color="#3B82F6" />
        <TechSpheres />
      </Canvas>
    </section>
  );
}
