"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ScrollProgress.css";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      gsap.set(bar, { scaleX: progress / 100, transformOrigin: "left center" });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={barRef} className="scroll-progress-bar" />;
}
