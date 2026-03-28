"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import {
  Github, Linkedin, Mail, ArrowRight, Menu, X,
  ExternalLink, Brain, Zap, Shield, Database, Radio,
  ShoppingCart, Globe, Users, Building2, HeartPulse, Link2
} from "lucide-react";

// ============================================================
// MAGNETIC BUTTON — cursor-attracted, zero re-renders
// ============================================================
function MagneticButton({ children, className = "", href = "#", variant = "primary" }: {
  children: ReactNode; className?: string; href?: string; variant?: "primary" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-outline"} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.a>
  );
}

// ============================================================
// TILT CARD — mouse-tracking 3D perspective
// ============================================================
function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [6, -6]);
  const rotateY = useTransform(x, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// REVEAL — scroll-triggered fade + slide
// ============================================================
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// STAGGER CONTAINER — blur + fade sequential reveal
// ============================================================
function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 120, damping: 18 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#" className="nav-logo">Jihan<span className="dot">.</span></a>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={active === l.href.slice(1) ? "active" : ""}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-status">
            <span className="nav-status-dot" />
            Available
          </div>
          <a href="#contact" className="nav-cta">Hire Me</a>
          <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-nav open">
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close">
            <X size={24} />
          </button>
          {links.map((l, i) => (
            <motion.a
              key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {l.label}
            </motion.a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem" }}>
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-img" />
      <div className="hero-grid-overlay" />
      <div className="hero-gradient-vignette" />

      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-eyebrow">AI-Native Full-Stack Developer</div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Jihan<span className="dot">.</span>
          </motion.h1>

          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            I build AI systems and digital products that run in production.
          </motion.p>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Full-stack developer specializing in <strong>AI/LLM orchestration</strong>,{" "}
            <strong>government-scale platforms</strong>, and <strong>production SaaS products</strong>. Over
            5 years, 6,700+ commits across 67 repositories — building systems that serve thousands of real users
            in Bangladesh's courts, universities, and startups.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Get in Touch
            </MagneticButton>
          </motion.div>

          <motion.div
            className="hero-metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-metric">
              <span className="hero-metric-value"><span className="accent">6.7</span>K+</span>
              <span className="hero-metric-label">Commits</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric">
              <span className="hero-metric-value">67</span>
              <span className="hero-metric-label">Repos</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric">
              <span className="hero-metric-value">5+</span>
              <span className="hero-metric-label">Years</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric">
              <span className="hero-metric-value">26+</span>
              <span className="hero-metric-label">Projects</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-scroll-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        Scroll
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About() {
  const strengths = [
    {
      icon: <Brain size={13} />,
      title: "AI-Native Architecture",
      desc: "LLM orchestration, AI gateways, function calling, and vector databases at production scale.",
    },
    {
      icon: <Building2 size={13} />,
      title: "Government-Scale Platforms",
      desc: "End-to-end digital systems for e-Judiciary — case filing, tracking, payments, and SMS/email workflows.",
    },
    {
      icon: <Zap size={13} />,
      title: "Full-Stack Delivery",
      desc: "End-to-end product builds: Laravel backends, Next.js frontends, real-time features, and deployment.",
    },
    {
      icon: <Shield size={13} />,
      title: "Enterprise Security",
      desc: "RBAC, JWT authentication, multi-role panels, and secure payment processing.",
    },
  ];

  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-bio">
            <div className="section-label">About</div>
            <h2>Production systems,<br />not pet projects.</h2>
            <p>
              I build software that people actually use. The <strong>E-Family Court platform</strong> handles
              case filings for Bangladesh's judiciary across Dhaka and Chattogram. The{" "}
              <strong>DIU Routine Scraper</strong> serves thousands of students daily.{" "}
              <strong>Student Hub</strong> manages clubs, courses, and orientation for an entire university.
            </p>
            <p>
              My stack spans <strong>Python</strong> for AI and automation, <strong>TypeScript</strong> for
              modern web, and <strong>Laravel</strong> for enterprise backends. I handle everything from
              database design to deployment — and I write code that others can actually maintain.
            </p>
            <p>
              Available for freelance projects, long-term collaborations, and full-time roles.
              If you need someone who ships, let's talk.
            </p>
          </Reveal>

          <StaggerContainer className="about-strengths">
            {strengths.map((s) => (
              <StaggerItem key={s.title}>
                <div className="strength-item">
                  <div className="strength-icon">{s.icon}</div>
                  <div className="strength-text">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROJECTS — Bento Grid
// ============================================================
function Projects() {
  const projects = [
    {
      id: "efamily",
      badge: "Government",
      badgeClass: "blue",
      commits: "Active 2025",
      title: "E-Family Court — National e-Judiciary Platform",
      desc: "Contributed as full-stack developer to Bangladesh's end-to-end digital case filing system for Family Courts in Dhaka and Chattogram. Citizens file cases online, track progress, make payments, and receive SMS/email updates. Judges manage hearings and issue orders; lawyers submit documents; staff verify and generate reports.",
      tech: ["Laravel", "PHP", "MSSQL", "JWT", "dompdf", "AJAX"],
      url: "https://efamilycourt.judiciary.gov.bd/",
      cover: "/assets/images/hero-bg.webp",
      icon: <Building2 size={28} color="white" />,
      label: "E-Judiciary Bangladesh",
      size: "featured",
    },
    {
      id: "rschat",
      badge: "Real-Time",
      commits: "1,874 commits",
      title: "RSChat — Real-Time Chat Platform",
      desc: "Production-grade real-time chat infrastructure handling thousands of concurrent connections. WebSocket rooms, admin moderation dashboards, user panels, and real-time state management with TypeScript throughout.",
      tech: ["TypeScript", "WebSockets", "Socket.io", "Node.js"],
      url: "https://github.com/Th3X-Zohir/RSChat",
      cover: "/assets/images/rschat-cover.webp",
      icon: <Radio size={28} color="white" />,
      label: "Real-Time Systems",
      size: "wide",
    },
    {
      id: "falconai",
      badge: "AI / LLM",
      badgeClass: "green",
      commits: "1,187 commits",
      title: "FalconAI — AI Gateway & LLM Orchestration",
      desc: "Core contributor to AI gateway infrastructure providing multi-model orchestration for enterprise clients. Built request routing, intelligent fallbacks, and multi-model pipelines across gpt-4, claude-3, and gemini.",
      tech: ["Python", "LLM", "LangChain", "AI Gateway"],
      url: "https://github.com/zionmezba/FalconAI",
      cover: "/assets/images/falconai-cover.webp",
      icon: <Brain size={28} color="white" />,
      label: "AI Infrastructure",
      size: "wide",
    },
    {
      id: "routine",
      badge: "Automation",
      commits: "Active system",
      title: "DIU Routine Scrapper — University Automation Platform",
      desc: "Centralized automation platform for Daffodil International University. Scrapes official DIU routines, builds CSE databases, precomputes batch/teacher/room schedules. FCM push notifications, real-time booking, and a full Android app.",
      tech: ["Python Flask", "SocketIO", "Firebase FCM", "Android"],
      url: "https://routine.zohirrayhan.me/",
      cover: "",
      icon: <Database size={28} color="white" />,
      label: "University Automation",
      size: "standard",
    },
    {
      id: "studenthub",
      badge: "SaaS",
      commits: "Active system",
      title: "Student Hub — University Management System",
      desc: "Official university management platform with orientation signup and digital food tokens, club management with payments and certificate generation, and dynamic course enrollment synced from GoEdu.",
      tech: ["Laravel", "Blade", "MySQL", "JWT"],
      url: "https://studentshub.daffodilvarsity.edu.bd/team",
      cover: "",
      icon: <Users size={28} color="white" />,
      label: "University SaaS",
      size: "standard",
    },
    {
      id: "ecomai",
      badge: "E-Commerce",
      commits: "96 commits",
      title: "ecomai — Multi-Tenant SaaS Platform",
      desc: "Shopify-alternative e-commerce platform with multi-tenant architecture, Stripe payments, subscription billing, delivery tracking, and admin dashboards — one codebase, multiple stores.",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      url: "https://github.com/Th3X-Zohir/ecomai",
      cover: "/assets/images/ecomai-cover.webp",
      icon: <ShoppingCart size={28} color="white" />,
      label: "SaaS Platform",
      size: "standard",
    },
    {
      id: "linkpay",
      badge: "FinTech",
      badgeClass: "green",
      commits: "56 commits",
      title: "LINKPAY — Payment Integration Platform",
      desc: "Payment gateway integration platform connecting multiple payment providers. Built with modern architecture for reliable, secure, and scalable transaction processing.",
      tech: ["TypeScript", "Node.js", "Payment APIs"],
      url: "https://github.com/Th3X-Zohir/LINKPAY",
      cover: "",
      icon: <Link2 size={28} color="white" />,
      label: "FinTech",
      size: "standard",
    },
    {
      id: "bloodbridge",
      badge: "Healthcare",
      badgeClass: "blue",
      commits: "Active system",
      title: "Blood Bridge — Blood Donor Finder",
      desc: "Real-time geolocation-based donor finder with interactive maps, blood group filtering by radius, live donor ETA tracking, and a community feed for urgent blood requests.",
      tech: ["Python Flask", "Leaflet.js", "MySQL", "Geolocation API"],
      url: "https://blood.shafinahmed.site/find-donor/dummy",
      cover: "",
      icon: <HeartPulse size={28} color="white" />,
      label: "Healthcare Tech",
      size: "standard",
    },
  ];

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal className="projects-header">
          <div className="section-label">Featured Projects</div>
          <h2 className="section-heading">Built for real people,<br />running in production.</h2>
          <p className="section-sub">
            Not portfolio demos. These are live systems serving thousands of users across Bangladesh's
            judiciary, universities, and startups.
          </p>
        </Reveal>

        <div className="bento-grid">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <TiltCard className={`bento-card ${p.size === "featured" ? "featured" : ""} ${p.size === "wide" ? "wide" : ""}`}>
                <div className="bento-cover">
                  {p.cover ? (
                    <img src={p.cover} alt={p.title} className="bento-cover-img" loading="lazy" />
                  ) : (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <div style={{ opacity: 0.15 }}>{p.icon}</div>
                    </div>
                  )}
                  <div className="bento-cover-overlay">
                    <div className="bento-cover-content">
                      <div style={{ marginBottom: 6 }}>{p.icon}</div>
                      <div className="bento-cover-label">{p.label}</div>
                    </div>
                  </div>
                </div>

                <div className="bento-body">
                  <div className="bento-meta">
                    <span className={`bento-badge ${p.badgeClass || ""}`}>{p.badge}</span>
                    <span className="bento-commits">{p.commits}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="bento-footer">
                    <div className="bento-tech">
                      {p.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="bento-link">
                      View <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SKILLS / STACK
// ============================================================
function Skills() {
  const categories = [
    {
      title: "Languages",
      tags: ["TypeScript", "Python", "PHP", "SQL", "Java", "Bash", "HTML/CSS", "JavaScript"],
    },
    {
      title: "Frameworks",
      tags: ["Laravel", "Next.js", "React", "Node.js", "Flask", "Socket.io", "FastAPI"],
    },
    {
      title: "AI & Data",
      tags: ["OpenAI API", "LangChain", "Vector DBs", "Playwright", "Selenium", "Puppeteer", "Pandas"],
    },
    {
      title: "Infrastructure",
      tags: ["PostgreSQL", "MySQL", "MSSQL", "Redis", "Firebase", "Docker", "AWS"],
    },
  ];

  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <Reveal>
          <div className="section-label">Stack</div>
          <h2 className="section-heading">Tools of the trade.</h2>
          <p className="section-sub">
            The full stack, from AI models to production databases.
          </p>
        </Reveal>

        <StaggerContainer className="stack-grid">
          {categories.map((cat) => (
            <StaggerItem key={cat.title}>
              <div className="stack-category">
                <h4>{cat.title}</h4>
                <div className="stack-tags">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="stack-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ============================================================
// EXPERIENCE / TIMELINE
// ============================================================
function Experience() {
  const items = [
    {
      period: "2025 — Present",
      title: "E-Family Court Platform",
      subtitle: "Full-Stack Developer — Government Project",
      desc: "Building Bangladesh's national e-filing platform for Family Courts. Handles case submission, payment processing, SMS/email notifications, judge dashboards, and lawyer portals. Microsoft SQL Server backend with Laravel, JWT auth, and dompdf for document generation.",
      current: true,
    },
    {
      period: "2020 — Present",
      title: "Independent Development",
      subtitle: "Full-Stack Developer — Freelance",
      desc: "Building and maintaining production systems across universities, fintech, and AI. RSChat (1,874 commits), DIU Routine Platform (daily active users), Student Hub, Blood Bridge, LINKPAY, and multiple AI gateway contributions. 6,700+ commits across 67 repositories.",
      current: false,
    },
    {
      period: "2020 — 2024",
      title: "University Tools & Automation",
      subtitle: "Student Developer — DIU",
      desc: "Built the DIU Routine Scraper (Flask, SocketIO, FCM, Android), Student Hub (Laravel), and various campus tools. Served thousands of students and faculty daily with production-grade automation.",
      current: false,
    },
  ];

  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <div className="section-label">Experience</div>
          <h2 className="section-heading">Where I've worked.</h2>
          <p className="section-sub">
            A track record of production systems, not just coursework.
          </p>
        </Reveal>

        <StaggerContainer className="timeline">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-marker-dot" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-period">{item.period}</div>
                  <h3>{item.title}</h3>
                  <h4>{item.subtitle}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-inner">
          <Reveal>
            <div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="contact-heading">
              Let's build<br />something that ships.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="contact-sub">
              Available for freelance projects, full-time roles, and long-term collaborations.
              I work across the stack — AI systems, SaaS platforms, or anything that needs shipping.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="mailto:Zohirrayhanweb@gmail.com" className="contact-email">
              Zohirrayhanweb@gmail.com
            </a>
            <div className="contact-availability">
              <span className="nav-status-dot" />
              Available for new projects
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="contact-actions">
              <MagneticButton href="mailto:Zohirrayhanweb@gmail.com" variant="primary">
                <Mail size={16} /> Send Email
              </MagneticButton>
              <MagneticButton href="https://github.com/Th3X-Zohir" variant="outline">
                <Github size={16} /> GitHub
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="contact-social">
              <a href="https://github.com/Th3X-Zohir" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/th3x-zohir" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com/th3x_zohir" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <X size={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <p>
            Built by <a href="https://github.com/Th3X-Zohir" target="_blank" rel="noopener noreferrer">Jihan</a>
            &nbsp;&middot;&nbsp; {new Date().getFullYear()}
          </p>
        </div>
        <div className="footer-right">
          <a href="#hero">Top</a>
          <a href="https://github.com/Th3X-Zohir" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
