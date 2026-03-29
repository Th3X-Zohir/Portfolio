"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Landing.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Landing({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      tl.to(".landing-text-block", { y: -60, opacity: 0, duration: 0.5 }, 0)
        .to(".landing-circle-glow", { scale: 0.5, opacity: 0, duration: 0.3 }, 0)
        .to(".landing-3d-panel", { y: 80, opacity: 0.3, duration: 0.5 }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="landing-section" id="landingDiv" aria-labelledby="landing-heading">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="landing-circle-glow landing-circle-glow--1" aria-hidden="true" />
      <div className="landing-circle-glow landing-circle-glow--2" aria-hidden="true" />
      <div className="landing-circle-glow landing-circle-glow--rim" aria-hidden="true" />

      <div className="landing-text-block">
        <div className="landing-eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          AI-Native Full-Stack Developer
        </div>

        <h1 className="landing-name" id="landing-heading">
          ZOHIR<br />
          <span>RAYHAN</span>
        </h1>

        <p className="landing-tagline">
          I build AI systems<br />that ship.
        </p>

        <div className="landing-actions">
          <a href="#work" className="btn-primary" data-cursor="link">
            Explore Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="#contact" className="btn-ghost" data-cursor="link">
            Get in Touch
          </a>
        </div>
      </div>

      <div className="landing-3d-panel">
        {children}
      </div>

      <div className="landing-bottom-label">
        <span className="landing-city">Dhaka, Bangladesh</span>
        <span className="landing-available" role="status" aria-label="Currently available for work">
          <span className="available-dot" aria-hidden="true" />
          Available for work
        </span>
      </div>

      <div className="landing-scroll-indicator" aria-hidden="true">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line">
          <div className="scroll-line-inner" />
        </div>
      </div>
    </section>
  );
}
