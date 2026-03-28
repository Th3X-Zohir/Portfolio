"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github, Linkedin, Mail, ArrowRight, Menu, X,
  Check, ExternalLink, Brain, Zap, Shield, Database, Radio,
  ShoppingCart, Globe, Lock, Layers
} from "lucide-react";

// ===== REVEAL =====
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== NAVBAR =====
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
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#" className="nav-logo">
            Jihan<span className="dot">.</span>
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
          <div className="nav-available">
            <span className="nav-available-dot" />
            Available
          </div>
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
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {l.label}
            </motion.a>
          ))}
          <a
            href="mailto:Zohirrayhanweb@gmail.com"
            style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}

// ===== HERO =====
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="hero-eyebrow">AI-Native Full-Stack Developer</div>

          <h1 className="hero-name">Jihan.</h1>

          <p className="hero-title">I build AI systems &amp; products that ship.</p>

          <p className="hero-bio">
            I'm a full-stack developer specializing in <strong>AI/LLM orchestration</strong>,{" "}
            <strong>real-time platforms</strong>, and <strong>production SaaS products</strong>. Over 5 years,
            6,700+ commits across 67 repositories — with 26+ collaborations on real-world projects.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>

          <div className="hero-meta">
            <div className="hero-stat">
              <span className="hero-stat-value">6,700+</span>
              <span className="hero-stat-label">Commits</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">67</span>
              <span className="hero-stat-label">Repos</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">5+</span>
              <span className="hero-stat-label">Years</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">26+</span>
              <span className="hero-stat-label">Teams</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== ABOUT =====
function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-bio">
            <div className="section-label">About</div>
            <h2>More than code.<br />I ship products.</h2>
            <p>
              I'm a developer who goes beyond writing components. I design systems — from AI gateways
              handling thousands of concurrent requests to multi-tenant SaaS platforms processing
              real payments. Every project I take on gets the full treatment: architecture, execution, deployment.
            </p>
            <p>
              My work spans <strong>AI/LLM orchestration</strong>, <strong>real-time communication</strong>,
              <strong>e-commerce platforms</strong>, and <strong>enterprise data automation</strong>.
              I've collaborated with 26+ teams across startups, agencies, and AI companies — contributing
              to systems that serve real users at scale.
            </p>
            <p>
              Fluent across the stack: TypeScript, Python, Laravel, Next.js, PostgreSQL, and more.
              When a project needs it, I pick up whatever technology is right for the job.
            </p>
          </Reveal>

          <div className="about-strengths">
            {[
              {
                icon: <Brain size={13} />,
                title: "AI-Native Architecture",
                desc: "LLM orchestration, AI gateways, function calling, and vector databases.",
              },
              {
                icon: <Zap size={13} />,
                title: "Full-Stack Delivery",
                desc: "End-to-end product builds — frontend to backend to deployment.",
              },
              {
                icon: <Shield size={13} />,
                title: "Enterprise-Grade",
                desc: "RBAC, multi-tenant systems, and secure authentication at scale.",
              },
              {
                icon: <Database size={13} />,
                title: "Data Engineering",
                desc: "Scraping pipelines, browser automation, and multi-platform data flows.",
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div className="strength-item">
                  <div className="strength-check">{s.icon}</div>
                  <div className="strength-text">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
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

// ===== PROJECTS =====
function Projects() {
  const projects = [
    {
      id: "rschat",
      badge: "Real-Time",
      commits: "1,874 commits",
      title: "RSChat",
      desc: "Production-grade real-time chat infrastructure handling thousands of concurrent connections. Built with WebSocket rooms, admin moderation panels, user management, and real-time state — TypeScript throughout for reliability.",
      tech: ["TypeScript", "WebSockets", "Socket.io", "Node.js"],
      url: "https://github.com/Th3X-Zohir/RSChat",
      icon: <Radio size={26} color="white" />,
      label: "Real-Time",
    },
    {
      id: "ecomai",
      badge: "SaaS",
      commits: "96 commits",
      title: "ecomai",
      desc: "Shopify-alternative e-commerce platform with multi-tenant architecture, Stripe payments, subscription billing, and admin dashboards — one codebase, multiple stores.",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      url: "https://github.com/Th3X-Zohir/ecomai",
      icon: <ShoppingCart size={26} color="white" />,
      label: "SaaS",
    },
    {
      id: "falconai",
      badge: "AI",
      commits: "1,187 commits (collab)",
      title: "FalconAI",
      desc: "Core contributor to AI gateway infrastructure — multi-model orchestration, request routing, intelligent fallbacks, and enterprise AI pipelines for multiple LLM providers.",
      tech: ["Python", "LLM", "AI Gateway", "LangChain"],
      url: "https://github.com/zionmezba/FalconAI",
      icon: <Brain size={26} color="white" />,
      label: "AI",
      collab: true,
    },
    {
      id: "rbac",
      badge: "Enterprise",
      commits: "54 commits",
      title: "LaravelRBAC",
      desc: "Enterprise-grade role-based access control with granular permissions, middleware architecture, and admin panel integration — built for production security.",
      tech: ["Laravel", "TypeScript", "RBAC", "MySQL"],
      url: "https://github.com/Th3X-Zohir/LaravelRBAC",
      icon: <Shield size={26} color="white" />,
      label: "Enterprise",
    },
    {
      id: "scraper",
      badge: "Data",
      commits: "100+ commits",
      title: "Scraping Toolkit",
      desc: "Multi-platform scraping suite covering LinkedIn, Twitter/X, and Telegram. Browser automation with proxy rotation, CAPTCHA handling, and scalable data pipelines.",
      tech: ["Python", "Playwright", "Selenium", "Redis"],
      url: "https://github.com/Th3X-Zohir/beastscrapper",
      icon: <Globe size={26} color="white" />,
      label: "Data",
    },
  ];

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal className="projects-header">
          <div className="section-label">Featured Work</div>
          <h2 className="section-heading">Projects that ship.</h2>
          <p className="section-sub">
            Not tutorials. Real production systems with real users, real commits, and measurable impact.
          </p>
        </Reveal>

        <div className="projects-grid">
          {/* RSChat — Featured */}
          <Reveal delay={0.05}>
            <div className="project-card featured">
              <div className="project-cover">
                <div className="project-cover-bg pc-rschat" />
                <div className="project-cover-content">
                  <div className="project-cover-icon">{projects[0].icon}</div>
                  <div className="project-cover-label">{projects[0].label}</div>
                </div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-badge">{projects[0].badge}</span>
                  <span className="project-commits">{projects[0].commits}</span>
                </div>
                <h3>{projects[0].title} — Real-Time Chat Platform</h3>
                <p>{projects[0].desc}</p>
                <div className="project-footer">
                  <div className="project-tech">
                    {projects[0].tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <a href={projects[0].url} target="_blank" rel="noopener noreferrer" className="project-link">
                    View on GitHub <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Other projects */}
          {projects.slice(1).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07 + 0.1}>
              <div className="project-card">
                <div className="project-cover">
                  <div className={`project-cover-bg pc-${p.id}`} />
                  <div className="project-cover-content">
                    <div className="project-cover-icon">{p.icon}</div>
                    <div className="project-cover-label">{p.label}</div>
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
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub <ExternalLink size={13} />
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

// ===== SKILLS =====
function Skills() {
  const categories = [
    {
      title: "Languages",
      tags: ["TypeScript", "Python", "PHP", "SQL", "Bash", "HTML/CSS", "JavaScript"],
    },
    {
      title: "Frameworks & Runtime",
      tags: ["Next.js", "React", "Laravel", "Node.js", "Express", "Socket.io", "FastAPI"],
    },
    {
      title: "AI & Data",
      tags: ["OpenAI API", "LangChain", "Vector DBs", "Playwright", "Selenium", "Prisma", "PostgreSQL"],
    },
    {
      title: "Infrastructure",
      tags: ["Git", "GitHub", "Docker", "Redis", "Nginx", "AWS", "Vercel"],
    },
  ];

  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <Reveal>
          <div className="section-label">Stack</div>
          <h2 className="section-heading">Tools of the trade.</h2>
          <p className="section-sub">
            Technologies I work with day-to-day across AI, full-stack, and infrastructure.
          </p>
        </Reveal>

        <div className="skills-grid">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.07}>
              <div className="skill-category">
                <h4>{cat.title}</h4>
                <div className="skill-tags">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="skill-tag">{tag}</span>
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
      title: "FalconAI & Jury AI",
      subtitle: "Collaborator / Contributor",
      desc: "Core contributor to AI gateway infrastructure (FalconAI, 1,187 commits) and legal AI platform (Jury AI). Built multi-model orchestration pipelines and AI processing workflows for enterprise clients.",
      current: false,
    },
    {
      period: "Daffodil International University",
      title: "Campus Tools & Automation",
      subtitle: "Student Developer",
      desc: "Built campus-wide tools for DIU — class routine scrapers, notice boards, lab management systems, and campus scheduling apps. Real experience building software for real users.",
      current: false,
    },
  ];

  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <div className="section-label">Experience</div>
          <h2 className="section-heading">Where I&apos;ve worked.</h2>
          <p className="section-sub">
            A track record of building real systems, not just coursework.
          </p>
        </Reveal>

        <div className="timeline">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
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
            </Reveal>
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
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="contact-heading">
              Let&apos;s build<br />something great.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="contact-sub">
              Available for new projects. Whether it&apos;s an AI system, a SaaS product,
              or a real-time platform — let&apos;s talk.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="mailto:Zohirrayhanweb@gmail.com" className="contact-email-link">
              Zohirrayhanweb@gmail.com
            </a>
            <div className="contact-availability">
              <span className="nav-available-dot" />
              Available for new projects
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="contact-actions">
              <a href="mailto:Zohirrayhanweb@gmail.com" className="btn btn-primary">
                <Mail size={16} /> Send Email
              </a>
              <a href="https://github.com/Th3X-Zohir" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Github size={16} /> GitHub
              </a>
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

// ===== FOOTER =====
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

// ===== MAIN =====
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
