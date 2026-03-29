"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Landing.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Landing({ children }: { children?: React.ReactNode }) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      // Landing text animates in
      gsap.fromTo(
        ".landing-eyebrow",
        { y: 30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".landing-name",
        { y: 80, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        ".landing-tagline",
        { y: 60, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.7 }
      );
      gsap.fromTo(
        ".landing-actions",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.9 }
      );

      // Scroll away landing text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#smooth-wrapper",
          start: "top top",
          end: "20% top",
          scrub: 1.5,
        },
      });

      tl.to(".landing-text-block", { y: -80, opacity: 0, filter: "blur(4px)", duration: 0.4 }, 0)
        .to(".landing-circle-glow", { scale: 0.3, opacity: 0, duration: 0.3 }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="landing-section" id="landingDiv">
      {/* Background glow circles */}
      <div className="landing-circle-glow landing-circle-glow--1" />
      <div className="landing-circle-glow landing-circle-glow--2" />
      <div className="landing-circle-glow landing-circle-glow--rim" />

      {/* Left side: text content */}
      <div className="landing-text-block">
        <div className="landing-eyebrow">
          <span className="eyebrow-dot" />
          AI-Native Full-Stack Developer
        </div>

        <h1 className="landing-name">
          ZOHIR<br />
          <span>RAYHAN</span>
        </h1>

        <p className="landing-tagline">
          I build AI systems<br />that ship.
        </p>

        <div className="landing-actions">
          <a href="#about" className="btn-primary" data-cursor="link">
            Explore Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="#contact" className="btn-ghost" data-cursor="link">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Right side: 3D character (fixed on desktop) */}
      <div className="landing-3d-panel">
        {children}
      </div>

      {/* Bottom label */}
      <div className="landing-bottom-label">
        <span className="landing-city">Dhaka, Bangladesh</span>
        <span className="landing-available">
          <span className="available-dot" />
          Available for work
        </span>
      </div>
    </section>
  );
}
