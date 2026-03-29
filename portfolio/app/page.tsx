"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loading from "./components/Loading";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import SocialIcons from "./components/SocialIcons";
import Landing from "./components/Landing";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Career from "./components/Career";
import Work from "./components/Work";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Scene3D = dynamic(() => import("./components/Scene3D"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = () => {
    setLoaded(true);
    setTimeout(() => {
      initAnimations();
    }, 100);
  };

  return (
    <>
      {!loaded && <Loading onComplete={handleLoadComplete} />}
      <Cursor />
      <Navbar />
      <SocialIcons />
      <main className="main-body">
        <Landing>
          <Scene3D />
        </Landing>
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}

function initAnimations() {
  if (typeof window === "undefined") return;
  const isDesktop = window.innerWidth > 1024;
  const triggerStart = isDesktop ? "20% 80%" : "top 70%";

  document.querySelectorAll<HTMLElement>("div.para").forEach((el) => {
    el.classList.add("visible");
    const text = el.textContent || "";
    el.innerHTML = text.trim().split(/\s+/).map((w) =>
      `<span class="split-word" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="split-word-inner" style="display:inline-block;">${w}</span></span>`
    ).join(" ");
    const words = Array.from(el.querySelectorAll<HTMLElement>(".split-word-inner"));
    gsap.fromTo(words, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.03,
      scrollTrigger: { trigger: el, toggleActions: "play pause resume reverse", start: triggerStart },
    });
  });

  document.querySelectorAll<HTMLElement>("h2.title, h3.title").forEach((el) => {
    const text = el.textContent || "";
    el.innerHTML = text.split("").map((c) =>
      c === " " ? " " : `<span class="split-char" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="split-char-inner" style="display:inline-block;">${c}</span></span>`
    ).join("");
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".split-char-inner"));
    gsap.fromTo(chars, { y: 80, opacity: 0, rotateX: -40 }, {
      y: 0, opacity: 1, rotateX: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.02,
      scrollTrigger: { trigger: el, toggleActions: "play pause resume reverse", start: triggerStart },
    });
  });

  document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
    const children = Array.from(parent.children);
    gsap.fromTo(children, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: parent, start: "top 80%", toggleActions: "play none none reverse" },
    });
  });

  gsap.fromTo(".career-info-box", { x: -80, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2,
    scrollTrigger: { trigger: ".career-timeline", start: "top 70%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(".whatido-card", { y: 60, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
    scrollTrigger: { trigger: ".whatido-cards", start: "top 75%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(".about-text-block", { x: -80, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: ".about-section", start: "top 70%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(".about-stats", { x: 60, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: ".about-stats", start: "top 80%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(".work-header", { y: 60, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
    scrollTrigger: { trigger: ".work-header", start: "top 80%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(".contact-header", { y: 60, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
    scrollTrigger: { trigger: ".contact-header", start: "top 80%", toggleActions: "play none none reverse" },
  });

  gsap.fromTo(".contact-grid", { y: 60, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1,
    scrollTrigger: { trigger: ".contact-grid", start: "top 85%", toggleActions: "play none none reverse" },
  });

  ScrollTrigger.refresh();
}
