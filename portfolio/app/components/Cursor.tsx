"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [label, setLabel] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Trailing dot — faster response
  const fastConfig = { damping: 30, stiffness: 500 };
  const tx = useSpring(cursorX, fastConfig);
  const ty = useSpring(cursorY, fastConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      const el = e.target as HTMLElement;
      const link = el.closest("a, button, [data-cursor]");
      if (link) {
        setIsPointer(true);
        setLabel((link as HTMLElement).dataset.cursor || "");
      } else {
        setIsPointer(false);
        setLabel("");
      }
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [cursorX, cursorY]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x,
          y,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.6 : 1,
          background: isPointer
            ? "rgba(249,115,22,0.08)"
            : "rgba(249,115,22,0.04)",
          borderColor: isPointer ? "#F97316" : "rgba(249,115,22,0.5)",
        }}
        transition={{ scale: { damping: 20, stiffness: 200 } }}
      >
        {label && (
          <span className="cursor-label">{label}</span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: tx,
          y: ty,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 0 : 1,
        }}
      />
    </>
  );
}
