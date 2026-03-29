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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#" className="navbar-logo" data-cursor="link">
            ZR<span>.</span>
          </a>

          <div className="navbar-links">
            <button onClick={() => scrollTo("about")} className="nav-link" data-cursor="link">About</button>
            <button onClick={() => scrollTo("work")} className="nav-link" data-cursor="link">Work</button>
            <button onClick={() => scrollTo("contact")} className="nav-link" data-cursor="link">Contact</button>
          </div>

          <a href="#contact" className="navbar-cta" data-cursor="link">
            Hire Me
          </a>
        </div>
      </nav>
    </>
  );
}
