"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ──────────────────────────────────────────────
// Manual text split — wraps words/chars in spans
// ──────────────────────────────────────────────
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.innerHTML = text
    .trim()
    .split(/\s+/)
    .map((w) => `<span class="split-word" style="display:inline-block;overflow:hidden;"><span class="split-word-inner" style="display:inline-block;">${w}</span></span>`)
    .join(" ");
  return Array.from(el.querySelectorAll<HTMLElement>(".split-word-inner"));
}

export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.innerHTML = text
    .split("")
    .map((c) =>
      c === " "
        ? " "
        : `<span class="split-char" style="display:inline-block;overflow:hidden;"><span class="split-char-inner" style="display:inline-block;">${c}</span></span>`
    )
    .join("");
  return Array.from(el.querySelectorAll<HTMLElement>(".split-char-inner"));
}

// ──────────────────────────────────────────────
// Scroll-triggered text reveal
// ──────────────────────────────────────────────
export function initTextAnimations() {
  if (typeof window === "undefined") return;

  const isDesktop = window.innerWidth > 1024;
  const triggerStart = isDesktop ? "20% 80%" : "top 70%";

  // Paragraphs — word-by-word reveal
  document.querySelectorAll<HTMLElement>(".para").forEach((el) => {
    el.classList.add("visible");
    const words = splitWords(el);
    gsap.fromTo(
      words,
      { y: 60, opacity: 0, filter: "blur(4px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          toggleActions: "play pause resume reverse",
          start: triggerStart,
        },
      }
    );
  });

  // Titles — character-by-character reveal
  document.querySelectorAll<HTMLElement>(".title").forEach((el) => {
    const chars = splitChars(el);
    gsap.fromTo(
      chars,
      { y: 80, opacity: 0, rotateX: -40, filter: "blur(4px)" },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power2.inOut",
        stagger: 0.025,
        scrollTrigger: {
          trigger: el,
          toggleActions: "play pause resume reverse",
          start: triggerStart,
        },
      }
    );
  });

  ScrollTrigger.refresh();
}

// ──────────────────────────────────────────────
// Scroll-driven character timeline (called from Scene3D)
// ──────────────────────────────────────────────
export function initCharacterTimeline(
  sceneContainer: HTMLElement | null
) {
  if (typeof window === "undefined" || !sceneContainer) return;
  if (window.innerWidth < 1024) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#smooth-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });

  // Phase 1: Landing → scroll away landing text
  tl.to(".landing-text-block", { opacity: 0, y: -60, duration: 0.3 }, 0)
    .to(".landing-circle", { opacity: 0, scale: 0.5, duration: 0.3 }, 0);

  // Phase 2: Character moves right at start, then drifts left as About appears
  tl.to(
    sceneContainer,
    { x: -120, duration: 1.5, ease: "power2.inOut" },
    0.1
  );

  // Phase 3: About content slides in
  tl.fromTo(
    ".about-text-block",
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8 },
    0.2
  );

  // Phase 4: About fades, WhatIDo slides up
  tl.to(".about-text-block", { opacity: 0, y: -80, duration: 0.4 }, 0.55)
    .fromTo(
      ".whatido-text-block",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.6
    );

  // Phase 5: Career slides in
  tl.to(".whatido-text-block", { opacity: 0, y: -80, duration: 0.4 }, 0.72)
    .fromTo(
      ".career-text-block",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.78
    );

  // Phase 6: Work slides in
  tl.to(".career-text-block", { opacity: 0, y: -80, duration: 0.4 }, 0.85)
    .fromTo(
      ".work-text-block",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.9
    );

  // Phase 7: TechStack / Contact
  tl.to(".work-text-block", { opacity: 0, y: -60, duration: 0.4 }, 0.96)
    .fromTo(
      ".contact-text-block",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.0
    );
}

// ──────────────────────────────────────────────
// Section reveal animations
// ──────────────────────────────────────────────
export function initSectionReveals() {
  if (typeof window === "undefined") return;

  // Fade + translate sections into view
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Stagger children
  gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((parent) => {
    const children = parent.children;
    gsap.fromTo(
      Array.from(children),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: parent,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Career timeline line draw
  gsap.fromTo(
    ".career-line",
    { scaleY: 0, transformOrigin: "top center" },
    {
      scaleY: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Career info boxes stagger
  gsap.fromTo(
    ".career-info-box",
    { x: -60, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    }
  );
}
