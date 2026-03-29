import "./Career.css";

const careers = [
  {
    period: "2025 -- Present",
    company: "E-Family Court Platform",
    role: "Full-Stack Developer -- Government Project",
    desc: "Building Bangladesh's national e-filing platform for Family Courts. Case submission, payment processing, SMS/email notifications, judge dashboards, and lawyer portals. Microsoft SQL Server backend with Laravel, JWT auth, and dompdf.",
    current: true,
  },
  {
    period: "2020 -- Present",
    company: "Independent Development",
    role: "Full-Stack Developer -- Freelance",
    desc: "RSChat (1,874 commits), DIU Routine Platform, Student Hub, Blood Bridge, LINKPAY, and multiple AI gateway contributions. 6,700+ commits across 67 repositories.",
    current: false,
  },
  {
    period: "2020 -- 2024",
    company: "University Tools & Automation",
    role: "Student Developer -- DIU",
    desc: "Built the DIU Routine Scraper (Flask, SocketIO, FCM, Android), Student Hub (Laravel), and campus tools serving thousands of students and faculty daily.",
    current: false,
  },
];

export default function Career() {
  return (
    <section className="career-section section" id="career" aria-labelledby="career-heading">
      <div className="career-inner">
        <div className="career-header">
          <h3 className="title career-label">Experience</h3>
          <h2 className="career-title" id="career-heading">
            Where I&apos;ve<br />
            <span>worked.</span>
          </h2>
        </div>

        <ol className="career-timeline">
          {careers.map((item, i) => (
            <li className="career-info-box" key={i}>
              <div className="career-info-left">
                <div className="career-period">{item.period}</div>
                {item.current && <div className="career-badge" aria-label="Currently working here">NOW</div>}
              </div>
              <div className="career-info-right">
                <h3 className="career-company">{item.company}</h3>
                <h4 className="career-role">{item.role}</h4>
                <p className="career-desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
