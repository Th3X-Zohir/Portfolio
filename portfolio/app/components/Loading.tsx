"use client";

import { useEffect, useRef, useState } from "react";
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
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 600);
          return 100;
        }
        return p + (100 - p) * 0.04 > 99.9 ? 100 : p + (100 - p) * 0.04;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">ZR<span>.</span></div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-percent">{Math.floor(progress)}%</p>
        <div className="loading-marquee">
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
