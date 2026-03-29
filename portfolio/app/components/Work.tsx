"use client";

import { useState, useCallback } from "react";
import "./Work.css";

const projects = [
  {
    id: "efamily",
    title: "E-Family Court",
    category: "Government Platform — Bangladesh",
    tools: "Laravel, MSSQL, JWT, dompdf, SMS APIs, Payment Gateway",
    desc: "National e-Judiciary platform. Citizens file cases, track progress, make payments online. Judges manage hearings; lawyers submit documents. Deployed across Dhaka and Chattogram.",
    accent: "#3B82F6",
    badge: "Live",
    url: "https://efamilycourt.judiciary.gov.bd/",
    icon: "🏛",
  },
  {
    id: "rschat",
    title: "RSChat",
    category: "Real-Time Infrastructure",
    tools: "TypeScript, Socket.io, Node.js, WebSockets, Redis",
    desc: "Production-grade real-time chat handling thousands of concurrent connections. WebSocket rooms, admin dashboards, user panels, and full TypeScript throughout.",
    accent: "#F97316",
    badge: "1,874 commits",
    url: "https://github.com/Th3X-Zohir/RSChat",
    icon: "💬",
  },
  {
    id: "falconai",
    title: "FalconAI",
    category: "AI Gateway & LLM Orchestration",
    tools: "Python, LangChain, AI Gateway, Multi-Model Routing",
    desc: "Core contributor to AI gateway infrastructure for enterprise clients. Multi-model orchestration across gpt-4, claude-3, and gemini with intelligent routing and fallbacks.",
    accent: "#A855F7",
    badge: "1,187 commits",
    url: "https://github.com/zionmezba/FalconAI",
    icon: "🧠",
  },
  {
    id: "routine",
    title: "DIU Routine Scraper",
    category: "University Automation",
    tools: "Python Flask, SocketIO, Firebase FCM, Android",
    desc: "Centralized automation for Daffodil International University. Scrapes official routines, builds CSE databases, FCM push notifications, and full Android app.",
    accent: "#F97316",
    badge: "Daily Active",
    url: "https://routine.zohirrayhan.me/",
    icon: "📅",
  },
  {
    id: "studenthub",
    title: "Student Hub",
    category: "University Management System",
    tools: "Laravel, Blade, MySQL, JWT, Payments",
    desc: "Official university platform with orientation signup, digital food tokens, club management with payments, and dynamic course enrollment.",
    accent: "#3B82F6",
    badge: "Live",
    url: "https://studentshub.daffodilvarsity.edu.bd/team",
    icon: "🎓",
  },
  {
    id: "neuralops",
    title: "Neural Ops",
    category: "AI Gateway Admin Control Plane",
    tools: "Node.js, TypeScript, Fastify, React, Recharts",
    desc: "Multi-provider AI gateway with live admin dashboard. Rate limiting, API key management, usage analytics, provider health, and one-click operational controls.",
    accent: "#22C55E",
    badge: "Active",
    url: "https://github.com/Th3X-Zohir/neural-ops-ai-gateway",
    icon: "⚡",
  },
];

export default function Work() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((i: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((((i % projects.length) + projects.length) % projects.length));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const p = projects[current];

  return (
    <section className="work-section section" id="work">
      <div className="work-inner">
        <div className="work-header">
          <h3 className="title work-label">Featured Work</h3>
          <h2 className="work-title">
            Built for real<br />
            <span>people.</span>
          </h2>
        </div>

        <div className="work-carousel">
          {/* Arrow nav */}
          <button className="work-arrow work-arrow--prev" onClick={() => goTo(current - 1)} aria-label="Previous" data-cursor="disable">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          </button>

          <button className="work-arrow work-arrow--next" onClick={() => goTo(current + 1)} aria-label="Next" data-cursor="disable">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>

          {/* Project slide */}
          <div
            className="work-slide"
            key={current}
            style={{ "--accent": p.accent } as React.CSSProperties}
          >
            <div className="slide-left">
              <div className="slide-icon">{p.icon}</div>
              <span className="slide-badge" style={{ color: p.accent, borderColor: p.accent + "40", background: p.accent + "15" }}>
                {p.badge}
              </span>
            </div>

            <div className="slide-right">
              <div className="slide-meta">
                <span className="slide-category">{p.category}</span>
                <span className="slide-number">{String(current + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="slide-title">{p.title}</h3>
              <p className="slide-desc">{p.desc}</p>
              <p className="slide-tools">{p.tools}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="slide-link" data-cursor="link">
                View Project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            </div>
          </div>

          {/* Dots */}
          <div className="work-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`work-dot ${i === current ? "work-dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                data-cursor="disable"
                style={i === current ? { background: projects[current].accent, borderColor: projects[current].accent } : {}}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
