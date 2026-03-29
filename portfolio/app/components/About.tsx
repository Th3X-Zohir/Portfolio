import "./About.css";

export default function About() {
  return (
    <section className="about-section section" id="about" aria-labelledby="about-heading">
      <div className="section-inner">
        <div className="about-text-block">
          <h3 className="title about-label">About</h3>
          <h2 className="about-heading" id="about-heading">
            Production systems,<br />not pet projects.
          </h2>
          <p className="para about-bio">
            The <strong>E-Family Court platform</strong> handles case filings for Bangladesh&apos;s
            judiciary. The <strong>DIU Routine Scraper</strong> serves thousands of students daily.
            <strong>Student Hub</strong> manages clubs, courses, and orientation for an entire university.
          </p>
          <p className="para about-bio">
            My stack spans <strong>Python</strong> for AI and automation, <strong>TypeScript</strong> for
            modern web, and <strong>Laravel</strong> for enterprise backends. I handle everything from
            database design to deployment -- and I write code that others can actually maintain.
          </p>
          <p className="para about-bio">
            Available for freelance projects, long-term collaborations, and full-time roles.
            If you need someone who ships, let&apos;s talk.
          </p>
        </div>

        <ul className="about-stats" data-stagger aria-label="Career statistics">
          <li className="stat-card">
            <div className="stat-number" aria-label="6,700 plus commits">6.7K+</div>
            <div className="stat-label">Commits</div>
          </li>
          <li className="stat-card">
            <div className="stat-number" aria-label="27 plus live projects">27+</div>
            <div className="stat-label">Live Projects</div>
          </li>
          <li className="stat-card">
            <div className="stat-number" aria-label="67 repositories">67</div>
            <div className="stat-label">Repositories</div>
          </li>
          <li className="stat-card">
            <div className="stat-number" aria-label="3 government systems">3</div>
            <div className="stat-label">Gov Systems</div>
          </li>
        </ul>
      </div>
    </section>
  );
}
