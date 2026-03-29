"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.css";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      if (!isHovering) {
        curX += (mouseX - curX) / 6;
        curY += (mouseY - curY) / 6;
        gsap.set(cursor, { x: curX, y: curY });
      }
      requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    requestAnimationFrame(tick);

    const handleEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const cursorType = (target as HTMLElement).dataset.cursor;

      if (cursorType === "disable") {
        cursor.classList.add("cursor--hidden");
        isHovering = true;
      } else if (cursorType === "icon") {
        const rect = target.getBoundingClientRect();
        cursor.classList.add("cursor--icon");
        isHovering = true;
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.15 });
      } else if (cursorType === "link") {
        cursor.classList.add("cursor--link");
        isHovering = true;
      }
    };

    const handleLeave = () => {
      cursor.classList.remove("cursor--hidden", "cursor--icon", "cursor--link");
      isHovering = false;
    };

    document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", handleEnter as EventListener);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter as EventListener);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return <div className="cursor" ref={cursorRef} data-cursor="disable" />;
}
