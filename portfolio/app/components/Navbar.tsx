"use client";

import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} aria-label="Main navigation">
      <div className="navbar-inner">
        <a href="#landingDiv" className="navbar-logo" data-cursor="link" aria-label="Zohir Rayhan - Back to top">
          ZR<span>.</span>
        </a>

        <div className="navbar-links">
          <a href="#about" className="nav-link" data-cursor="link">About</a>
          <a href="#work" className="nav-link" data-cursor="link">Work</a>
          <a href="#contact" className="nav-link" data-cursor="link">Contact</a>
        </div>

        <a href="#contact" className="navbar-cta" data-cursor="link">
          Hire Me
        </a>
      </div>
    </nav>
  );
}
