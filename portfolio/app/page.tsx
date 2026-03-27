"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Brain, Zap, Shield, Database, Cpu, ShoppingCart, Radio, Globe, Layers, Lock,
  Github, Linkedin, Mail, Send, ArrowRight, ChevronDown, Menu, X,
  Activity, PieChart, CheckCircle, Star, GitBranch, Layers3,
  Zap as ZapIcon, StarHalf
} from "lucide-react";

// ===== TYPEWRITER =====
const roles = [
  "AI-Native Full-Stack Developer",
  "Real-Time Systems Builder",
  "AI Gateway Architect",
  "SaaS Platform Engineer",
  "Data Pipeline Specialist",
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }
    if (!deleting && subIndex === roles[index].length) {
      const timeout = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));
    }, deleting ? 45 : 85);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <span>
      {roles[index].substring(0, subIndex)}
      <span className="inline-block w-0.5 h-[1em] bg-accent-bright align-middle ml-1 animate-pulse" />
    </span>
  );
}

// ===== MARQUEE =====
const techItems = [
  "TypeScript", "Python", "Next.js", "Node.js", "PostgreSQL", "Laravel",
  "WebSockets", "AI / LLM", "React", "Redis", "Docker", "Stripe",
  "LangChain", "Playwright", "Selenium", "Puppeteer", "JWT", "REST APIs",
  "GraphQL", "Prisma", "Supabase", "Firebase", "AWS", "Vercel",
  "Git", "GitHub", "CI/CD", "TypeScript", "Python", "Next.js",
  "Node.js", "PostgreSQL", "Laravel", "WebSockets", "AI / LLM",
];

// ===== ANIMATED COUNTER =====
function AnimatedCounter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <div ref={ref}>
      {target >= 1000 ? count.toLocaleString() + suffix : count + suffix}
    </div>
  );
}

// ===== SCROLL REVEAL =====
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== GITHUB CONTRIBUTION GRID =====
function ContribGrid() {
  const levels = ["", "l1", "l2", "l3", "l4"];
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const levelForDay = () => {
    const r = rand();
    if (r < 0.45) return 0;
    if (r < 0.65) return 1;
    if (r < 0.82) return 2;
    if (r < 0.94) return 3;
    return 4;
  };
  return (
    <>
      <div className="contrib-grid">
        {Array.from({ length: 52 * 7 }).map((_, i) => (
          <div key={i} className={`contrib-cell ${levels[levelForDay()]}`} />
        ))}
      </div>
      <div className="contrib-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`contrib-cell ${levels[l]}`} style={{ width: 9, height: 9 }} />
        ))}
        <span>More</span>
      </div>
    </>
  );
}

// ===== NAVBAR =====
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#github", label: "GitHub" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#" className="nav-logo">
            Th3<span className="accent">X</span>-Zohir
          </a>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={active === l.href.slice(1) ? "active" : ""}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav-cta">
            Hire Me <ArrowRight size={14} />
          </a>
          <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={28} />
            </button>
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ===== HERO =====
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section className="hero" id="hero">
      <div className="bg-stars" />
      <div className="bg-grid" />

      <motion.div className="hero-glow hero-glow-1" style={{ y }} animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="hero-glow hero-glow-2" animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      <motion.div className="hero-glow hero-glow-3" animate={{ scale: [1, 0.9, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }} />

      <div className="container hero-content">
        <motion.div className="hero-text" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for projects
          </div>

          <motion.h1 className="hero-name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <span className="name">Jihan</span>
            <span className="dot">.</span>
          </motion.h1>

          <motion.p className="hero-role" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <Typewriter />
          </motion.p>

          <motion.p className="hero-tagline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            I build <strong>production AI systems</strong>, <strong>real-time platforms</strong>, and{" "}
            <strong>data pipelines</strong> that companies actually ship.{" "}
            6,700+ commits across 67 repositories.
          </motion.p>

          <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <a href="#projects" className="btn btn-primary">
              <Zap size={18} /> View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              <Mail size={18} /> Get In Touch
            </a>
          </motion.div>

          <motion.div className="hero-stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="hero-stat">
              <span className="hero-stat-value"><span className="accent">6.7</span>K+</span>
              <span className="hero-stat-label">Commits</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">67</span>
              <span className="hero-stat-label">Repos</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">26+</span>
              <span className="hero-stat-label">Collabs</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-3d-card">
            <motion.div
              className="hero-card-window"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="window-dots">
                <span className="window-dot" />
                <span className="window-dot" />
                <span className="window-dot" />
                <span className="window-title">neural-ops-ai-gateway.ts</span>
                <span />
              </div>
              <div className="window-body">
                {[
                  { n: 1, html: <><span className="kw">import</span> <span className="fn">AIGateway</span> <span className="kw">from</span> <span className="str">{'@neural/ops'}</span></> },
                  { n: 2, html: <></> },
                  { n: 3, html: <><span className="kw">const</span> <span className="var">gateway</span> <span className="punct">=</span> <span className="kw">new</span> <span className="fn">AIGateway</span><span className="punct">{'{'}</span></> },
                  { n: 4, html: <><span className="prop">models</span><span className="punct">:</span> <span className="punct">[</span><span className="str">'gpt-4'</span><span className="punct">,</span> <span className="str">'claude-3'</span><span className="punct">,</span></> },
                  { n: 5, html: <><span className="str">'gemini-pro'</span><span className="punct">],</span></> },
                  { n: 6, html: <><span className="prop">strategy</span><span className="punct">:</span> <span className="str">'intelligent-fallback'</span><span className="punct">,</span></> },
                  { n: 7, html: <><span className="prop">routing</span><span className="punct">:</span> <span className="str">'latency-aware'</span><span className="punct">,</span></> },
                  { n: 8, html: <><span className="prop">cache</span><span className="punct">:</span> <span className="fn">new</span> <span className="fn">RedisCache</span><span className="punct">(),</span></> },
                  { n: 9, html: <><span className="punct">{'}'});</span></> },
                  { n: 10, html: <></> },
                  { n: 11, html: <><span className="kw">const</span> <span className="var">result</span> <span className="punct">=</span> <span className="kw">await</span> <span className="var">gateway</span><span className="punct">.</span><span className="fn">route</span><span className="punct">(</span></> },
                  { n: 12, html: <><span className="str">'user-query'</span><span className="punct">,</span> <span className="var">context</span></> },
                  { n: 13, html: <><span className="punct">);</span> <span style={{ color: 'var(--text-dim)' }}>{'//'} 45ms avg</span></> },
                ].map((line) => (
                  <div key={line.n} className="code-line">
                    <span className="line-num">{line.n}</span>
                    <span>{line.html}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="hero-floating-badge top-right"
              animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="badge-icon" style={{ background: "rgba(16,185,129,0.15)", color: "var(--green)" }}>
                <ZapIcon size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--green)", fontSize: "0.8rem" }}>45ms</div>
                <div style={{ color: "var(--text-dim)", fontSize: "0.65rem" }}>avg latency</div>
              </div>
            </motion.div>

            <motion.div
              className="hero-floating-badge bottom-left"
              animate={{ y: [0, 6, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="badge-icon" style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent-bright)" }}>
                <Layers3 size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--accent-bright)", fontSize: "0.8rem" }}>3 Models</div>
                <div style={{ color: "var(--text-dim)", fontSize: "0.65rem" }}>intelligent routing</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-hint">
        <ChevronDown size={18} />
        Scroll
      </div>
    </section>
  );
}

// ===== MARQUEE STRIP =====
function MarqueeStrip() {
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...techItems, ...techItems].map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== METRICS =====
function Metrics() {
  const metrics = [
    { value: 6700, suffix: "+", label: "Commits (All Repos)", icon: <GitBranch size={20} /> },
    { value: 67, suffix: "", label: "Repositories", icon: <Github size={20} /> },
    { value: 26, suffix: "+", label: "Collaborations", icon: <Layers size={18} /> },
    { value: 5, suffix: "+", label: "Years Active", icon: <StarHalf size={18} /> },
  ];

  return (
    <section className="metrics">
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.1}>
              <div className="metric-card">
                <div className="metric-icon">{m.icon}</div>
                <div className="metric-value">
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </div>
                <div className="metric-label">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== ABOUT =====
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-intro">
            <div className="profile-card">
              <div className="profile-avatar">J</div>
              <div className="profile-info">
                <h4>Jihan (Th3X-Zohir)</h4>
                <p>AI-Native Full-Stack Developer</p>
                <div className="profile-status">
                  <span className="status-dot" />
                  Open to projects
                </div>
              </div>
            </div>

            <h2>
              I Don't Just Write Code.<br />
              I <span className="highlight">Ship Products.</span>
            </h2>
            <p>
              I'm a high-output developer who builds <strong>complete, production-grade systems</strong> — not
              just frontend components or backend APIs. From AI gateways handling thousands of requests to
              multi-tenant SaaS platforms processing real payments, I ship things that companies actually use.
            </p>
            <p>
              My work spans <strong>AI/LLM orchestration</strong>, <strong>real-time communication systems</strong>,
              <strong>e-commerce platforms</strong>, and <strong>enterprise data automation</strong>. I've collaborated
              with 26+ teams across startups, agencies, and AI companies.
            </p>
          </Reveal>

          <div className="highlights-list">
            {[
              {
                icon: <Brain size={18} />,
                title: "AI-Native Architecture",
                desc: "AI gateways, LLM orchestration, function calling — I build AI infrastructure, not just prompts.",
              },
              {
                icon: <Zap size={18} />,
                title: "Rapid Full-Stack Delivery",
                desc: "Next.js to Laravel to Python — I ship complete products across the entire stack.",
              },
              {
                icon: <Shield size={18} />,
                title: "Enterprise-Grade Systems",
                desc: "RBAC, multi-tenant SaaS, payment processing — production architecture from day one.",
              },
              {
                icon: <Database size={18} />,
                title: "Data Engineering at Scale",
                desc: "Multi-platform scraping, browser automation, and data pipelines across LinkedIn, Twitter, and more.",
              },
            ].map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <div className="highlight-card">
                  <div className="highlight-icon">{h.icon}</div>
                  <div className="highlight-text">
                    <h4>{h.title}</h4>
                    <p>{h.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== EXPERTISE =====
function Expertise() {
  const cards = [
    {
      icon: <Cpu size={22} />,
      title: "AI & LLM Integration",
      desc: "AI gateways, multi-model orchestration pipelines, function calling, and chatbot infrastructure. I build the systems that make AI products actually work.",
      tags: ["OpenAI", "LangChain", "Vector DBs", "Function Calling", "Python"],
    },
    {
      icon: <ShoppingCart size={22} />,
      title: "E-Commerce & SaaS",
      desc: "Multi-tenant SaaS platforms, subscription billing, Stripe/PayPal integration, admin dashboards, and complete e-commerce architectures.",
      tags: ["Next.js", "Stripe", "Multi-tenant", "Laravel"],
    },
    {
      icon: <Radio size={22} />,
      title: "Real-Time Systems",
      desc: "WebSocket chat infrastructure, admin moderation panels, room management, and real-time state systems handling thousands of concurrent connections.",
      tags: ["WebSockets", "Socket.io", "TypeScript", "SSE"],
    },
    {
      icon: <Globe size={22} />,
      title: "Web Scraping & Automation",
      desc: "Multi-platform scraping at scale — LinkedIn, Twitter/X, Telegram, news sites. Browser automation, proxy rotation, and CAPTCHA handling.",
      tags: ["Playwright", "Selenium", "Puppeteer", "Python"],
    },
    {
      icon: <Lock size={22} />,
      title: "Auth & RBAC Systems",
      desc: "Enterprise-grade role-based access control, permission models, middleware architecture, and secure authentication flows.",
      tags: ["Laravel", "JWT", "Middleware", "Permissions"],
    },
    {
      icon: <Layers size={22} />,
      title: "Full-Stack Development",
      desc: "Complete product lifecycle — from database design and API architecture to polished frontends and deployment. TypeScript, Python, PHP, and more.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "REST APIs"],
    },
  ];

  return (
    <section className="expertise" id="expertise">
      <div className="container">
        <Reveal className="expertise-header">
          <div className="section-label">Expertise</div>
          <h2 className="section-title">What I Build</h2>
          <p>
            Deep expertise across the full stack — with AI integration as my core specialization.
            These aren't hobby projects; these are systems running in production.
          </p>
        </Reveal>

        <div className="expertise-grid">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07}>
              <div className="expertise-card">
                <div className="expertise-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="expertise-tags">
                  {card.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PROJECTS =====
function Projects() {
  const projects = [
    {
      id: "rschat",
      badge: "Real-Time",
      commits: "1,874 commits",
      title: "RSChat — Real-Time Chat Platform",
      desc: "A production-grade real-time chat infrastructure handling thousands of concurrent connections. WebSocket rooms, admin moderation dashboards, user panels, and real-time state management. TypeScript throughout for production reliability.",
      tech: ["TypeScript", "WebSockets", "Socket.io", "Admin Panel"],
      url: "https://github.com/Th3X-Zohir/RSChat",
      featured: true,
      icon: <Radio size={28} color="white" />,
    },
    {
      id: "ecomai",
      badge: "SaaS",
      commits: "96 commits",
      title: "ecomai — Multi-Tenant SaaS Platform",
      desc: "A full Shopify-alternative e-commerce platform — one codebase, multiple stores. Multi-tenant architecture, Stripe payments, subscription billing, delivery tracking, and admin dashboards.",
      tech: ["Next.js", "Stripe", "Multi-tenant", "TypeScript"],
      url: "https://github.com/Th3X-Zohir/ecomai",
      featured: false,
      icon: <ShoppingCart size={28} color="white" />,
    },
    {
      id: "falconai",
      badge: "AI",
      commits: "1,187 commits (collab)",
      title: "FalconAI — AI Gateway & Orchestration",
      desc: "Core collaborator on an AI gateway platform providing orchestration for multiple LLM providers. Built system-level AI infrastructure handling request routing, model fallbacks, and multi-model pipelines.",
      tech: ["Python", "LLM", "Orchestration", "AI Gateway"],
      url: "https://github.com/zionmezba/FalconAI",
      featured: false,
      collab: true,
      icon: <Brain size={28} color="white" />,
    },
    {
      id: "rbac",
      badge: "Enterprise",
      commits: "54 commits",
      title: "LaravelRBAC — Permission System",
      desc: "Enterprise-grade role-based access control system with granular permissions, middleware architecture, and admin panel integration. Security-critical systems built for production.",
      tech: ["Laravel", "TypeScript", "RBAC", "Middleware"],
      url: "https://github.com/Th3X-Zohir/LaravelRBAC",
      featured: false,
      icon: <Shield size={28} color="white" />,
    },
    {
      id: "scraper",
      badge: "Data",
      commits: "100+ commits",
      title: "Scraping Toolkit",
      desc: "Comprehensive scraping suite covering LinkedIn, Twitter/X, Telegram, and news platforms. Built with browser automation, proxy rotation, and CAPTCHA handling at scale.",
      tech: ["Python", "Playwright", "Selenium", "Puppeteer"],
      url: "https://github.com/Th3X-Zohir/beastscrapper",
      featured: false,
      icon: <Database size={28} color="white" />,
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <Reveal className="projects-header">
          <div className="section-label">Featured Work</div>
          <h2 className="section-title">Projects That <span style={{ background: "linear-gradient(135deg, var(--accent-bright), var(--accent-2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ship</span></h2>
          <p>
            Not a collection of tutorials. Real production systems with thousands of commits,
            real users, and measurable impact.
          </p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div className={`project-card ${p.featured ? "featured" : ""}`}>
                <div className={`project-header pg-${p.id}`}>
                  <div className="project-header-bg" />
                  <div className="project-header-overlay" />
                  <div className="project-header-content">
                    <div className="project-header-icon">{p.icon}</div>
                    <div className="project-header-title">{p.badge}</div>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-meta">
                    <span className={`project-badge ${p.collab ? "collab" : ""}`}>{p.badge}</span>
                    <span className="project-commits">{p.commits}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-footer">
                    <div className="project-tech">
                      {p.tech.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== GITHUB SECTION =====
function GithubSection() {
  const langs = [
    { name: "JavaScript", pct: 55, cls: "lang-js" },
    { name: "TypeScript", pct: 20, cls: "lang-ts" },
    { name: "Python", pct: 15, cls: "lang-py" },
    { name: "PHP/Blade", pct: 6, cls: "lang-php" },
    { name: "CSS/HTML", pct: 3, cls: "lang-css" },
    { name: "Other", pct: 1, cls: "lang-other" },
  ];

  return (
    <section className="github-section" id="github">
      <div className="container">
        <Reveal className="github-header">
          <div className="section-label">GitHub Activity</div>
          <h2 className="section-title">Consistently Shipped</h2>
          <p>
            Five years of consistent output across 67 repositories. Here's a snapshot of the work.
          </p>
        </Reveal>

        <div className="github-grid">
          <Reveal>
            <div className="github-card">
              <h3>
                <Activity size={18} style={{ color: "var(--accent-bright)" }} />
                Contribution Activity
              </h3>
              <ContribGrid />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="github-card">
              <h3>
                <PieChart size={18} style={{ color: "var(--accent-bright)" }} />
                Language Distribution
              </h3>
              <div className="lang-bars">
                {langs.map((l) => (
                  <div key={l.name} className="lang-row">
                    <div className="lang-row-header">
                      <span className="lang-name">{l.name}</span>
                      <span className="lang-pct">{l.pct}%</span>
                    </div>
                    <div className="lang-track">
                      <div className={`lang-fill ${l.cls}`} style={{ width: `${l.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="github-profile-btn">
                <a
                  href="https://github.com/Th3X-Zohir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <Github size={18} /> View Full GitHub Profile
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ===== EXPERIENCE =====
function Experience() {
  const items = [
    {
      period: "2020 — Present",
      title: "AI-Native Full-Stack Development",
      subtitle: "Independent / Freelance",
      desc: "Building production AI systems, SaaS platforms, and real-time applications. Collaborated with multiple startups and agencies on AI integration, e-commerce, and data engineering. Active across 67 repositories with 6,700+ commits.",
      current: true,
    },
    {
      period: "Core Collaborations",
      title: "FalconAI & Jury AI Teams",
      subtitle: "Collaborator / Contributor",
      desc: "Core contributor to AI gateway infrastructure (FalconAI, 1,187 commits) and legal AI platform (Jury AI). Built multi-model orchestration pipelines and AI processing workflows for enterprise clients.",
      current: false,
    },
    {
      period: "Daffodil International University",
      title: "Campus Tools & Automation",
      subtitle: "Student Developer",
      desc: "Built campus-wide tools for DIU — class routine scrapers, notice boards, lab management systems, and campus scheduling apps. First-hand experience building tools for real users.",
      current: false,
    },
  ];

  return (
    <section className="experience" id="experience">
      <div className="container">
        <Reveal className="experience-header">
          <div className="section-label">Experience</div>
          <h2 className="section-title">How I Work</h2>
        </Reveal>

        <div className="timeline">
          {items.map((item, i) => (
            <div key={item.title} className={`timeline-item ${item.current ? "current" : ""}`}>
              <div className="timeline-content">
                <div className="timeline-period">{item.period}</div>
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="timeline-center">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CONTACT =====
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-inner">
          <Reveal>
            <div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
            <h2 className="section-title">
              Let's Build Something<br />
              <span style={{ background: "linear-gradient(135deg, var(--accent-bright), var(--accent-2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Extraordinary</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="contact-availability">
              <span className="hero-badge-dot" />
              Available for new projects
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <a href="mailto:Zohirrayhanweb@gmail.com" className="contact-email">
              Zohirrayhanweb@gmail.com
            </a>
            <p className="contact-subtext">Typically responds within 24 hours</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="contact-cta-group">
              <a href="mailto:Zohirrayhanweb@gmail.com" className="contact-cta-primary">
                <Send size={18} /> Start a Conversation
              </a>
              <a href="#projects" className="contact-cta-secondary">
                <Layers size={18} /> View My Work
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="contact-trust">
              {["Free consultation", "Flexible engagement", "NDA available"].map((t) => (
                <div key={t} className="trust-item">
                  <CheckCircle size={14} style={{ color: "var(--green)" }} />
                  {t}
                </div>
              ))}
            </div>

            <div className="social-links">
              <a href="https://github.com/Th3X-Zohir" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com/in/th3x-zohir" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="https://twitter.com/th3x_zohir" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <X size={22} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <p>
            Designed &amp; built by <a href="https://github.com/Th3X-Zohir" target="_blank" rel="noopener noreferrer">Th3X-Zohir</a>
            &nbsp;&middot;&nbsp; 2026
          </p>
        </div>
        <div className="footer-right">
          <a href="#hero">Back to top</a>
          <a href="https://github.com/Th3X-Zohir" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN PAGE =====
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <Metrics />
      <About />
      <Expertise />
      <Projects />
      <GithubSection />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
