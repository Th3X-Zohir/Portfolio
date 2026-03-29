"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./ScrollProgress.css";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const val = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(val);
      if (barRef.current) {
        gsap.set(barRef.current, { scaleX: val / 100, transformOrigin: "left center" });
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page reading progress"
    />
  );
}
