import "./WhatIDo.css";

const whatIDoCards = [
  {
    label: "01",
    title: "AI-Native Architecture",
    desc: "LLM orchestration, AI gateways, function calling, and vector databases at production scale. Multi-model routing with fallbacks across GPT-4, Claude, and Gemini.",
    tags: ["LangChain", "LLM Routing", "RAG", "Vector DBs", "FastAPI", "Function Calling"],
  },
  {
    label: "02",
    title: "Government-Scale Platforms",
    desc: "End-to-end digital systems for e-Judiciary -- case filing, tracking, payments, and SMS/email workflows. Handling thousands of daily users across multiple cities.",
    tags: ["Laravel", "MSSQL", "JWT", "SMS APIs", "Payment Gateway", "RBAC"],
  },
  {
    label: "03",
    title: "Full-Stack Delivery",
    desc: "End-to-end builds: Python backends, Next.js frontends, real-time features, and production deployment. From database design to CI/CD pipelines.",
    tags: ["Next.js", "Python", "PostgreSQL", "Redis", "Docker", "CI/CD"],
  },
];

export default function WhatIDo() {
  return (
    <section className="whatido-section section" id="whatido" aria-labelledby="whatido-heading">
      <div className="whatido-inner">
        <div className="whatido-header">
          <h3 className="title whatido-label">What I Do</h3>
          <h2 className="whatido-title" id="whatido-heading">
            Building the future,<br />
            <span>one system at a time.</span>
          </h2>
        </div>

        <div className="whatido-cards" data-stagger role="list">
          {whatIDoCards.map((card) => (
            <article className="whatido-card" key={card.label} role="listitem" aria-labelledby={`whatido-card-${card.label}`}>
              <div className="card-header">
                <span className="card-number" id={`whatido-card-${card.label}`}>{card.label}</span>
                <div className="card-accent-line" aria-hidden="true" />
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
              <div className="card-tags" role="list" aria-label="Technologies used">
                {card.tags.map((tag) => (
                  <span key={tag} className="card-tag" role="listitem">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
