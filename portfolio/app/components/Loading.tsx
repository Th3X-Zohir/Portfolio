"use client";

import { useEffect, useState } from "react";
import "./Loading.css";

const marqueeItems = [
  "TypeScript", "Next.js", "Python", "AI / LLM", "WebSockets",
  "PostgreSQL", "LangChain", "Docker", "FastAPI", "React",
  "Laravel", "Firebase", "Node.js", "GPT-4", "Redis",
];

export default function Loading({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 60; // ~2.4s at 40ms intervals

    const interval = setInterval(() => {
      frame++;
      // Linear ramp from 0 to 100 over totalFrames
      const currentProgress = Math.min((frame / totalFrames) * 100, 100);
      setProgress(currentProgress);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 600);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="loading-content">
        <div className="loading-logo">ZR<span aria-hidden="true">.</span></div>
        <div className="loading-bar-track" aria-hidden="true">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-percent" aria-hidden="true">{Math.floor(progress)}%</p>
        <div className="loading-marquee" aria-hidden="true">
          <div className="loading-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="loading-marquee-item">
                {item} <span className="sep">&#9670;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
