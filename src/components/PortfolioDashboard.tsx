import React from "react";
import {
  FaAws,
  FaBriefcase,
  FaCode,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaHome,
  FaLaptopCode,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaServer,
  FaStar,
  FaTrophy,
  FaUser,
} from "react-icons/fa";
import { getPublicImageUrl } from "../utils/imageUtils";
import "./PortfolioDashboard.css";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type Project = {
  title: string;
  period: string;
  summary: string;
  tags: string[];
};

type ExperienceItem = {
  role: string;
  project: string;
  period: string;
  summary: string;
  tags: string[];
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <FaHome /> },
  { id: "about", label: "About", icon: <FaUser /> },
  { id: "experience", label: "Experience", icon: <FaBriefcase /> },
  { id: "projects", label: "Projects", icon: <FaLaptopCode /> },
  { id: "skills", label: "Skills", icon: <FaCode /> },
  { id: "contact", label: "Contact", icon: <FaEnvelope /> },
];

const stats = [
  { value: "3+", label: "Years Experience", icon: <FaCode /> },
  { value: "3", label: "Core Systems", icon: <FaBriefcase /> },
  { value: "0.3s", label: "SQL Query Result", icon: <FaDatabase /> },
  { value: "AI", label: "Assisted Workflow", icon: <FaStar /> },
];

const profileImages = [
  "/avatar.jpg",
  "/carousel_1.JPEG",
  "/carousel_2.JPEG",
  "/carousel_3.JPEG",
];

const projects: Project[] = [
  {
    title: "Real Estate Management Platform",
    period: "Apr 2023 - Dec 2025",
    summary:
      "Optimized slow SQL queries, resolved S3 pagination behavior, maintained modules, handled upgrades, and prepared root cause analysis reports.",
    tags: ["CakePHP", "MySQL", "AWS S3"],
  },
  {
    title: "Electric Charger Management System",
    period: "Sep 2023 - Dec 2025",
    summary:
      "Applied pessimistic and optimistic locking based on conflict risk, then refined UI flows to prevent invalid stock operations.",
    tags: ["Laravel", "jQuery", "MySQL"],
  },
  {
    title: "Employee Evaluation System",
    period: "Dec 2025 - Present",
    summary:
      "Translated implementation plans into migrations, backend logic, Vue screens, test cases, and reviewed AI-generated code before integration.",
    tags: ["Laravel", "Vue.js", "Inertia"],
  },
];

const experiences: ExperienceItem[] = [
  {
    role: "Software Engineer",
    project: "Employee Evaluation System",
    period: "2025 - Present",
    summary:
      "Clarifies business logic, breaks requirements into implementation units, and reviews AI-assisted code before integration.",
    tags: ["Laravel", "Vue.js", "AI Review"],
  },
  {
    role: "Full-stack Developer",
    project: "Real Estate Platform",
    period: "2023 - 2025",
    summary:
      "Maintained production modules, improved SQL performance, investigated S3 object retrieval issues, and supported client-facing RCA.",
    tags: ["CakePHP", "MySQL", "AWS S3"],
  },
  {
    role: "Backend-focused Developer",
    project: "Electric Charger System",
    period: "2023 - 2025",
    summary:
      "Designed safer stock workflows with data integrity controls and transaction locking strategies.",
    tags: ["Laravel", "Locking", "Data Integrity"],
  },
];

const skillGroups = [
  {
    title: "Languages",
    icon: <FaCode />,
    items: ["PHP", "JavaScript"],
  },
  {
    title: "Backend",
    icon: <FaServer />,
    items: ["Laravel", "CakePHP"],
  },
  {
    title: "Frontend",
    icon: <FaLaptopCode />,
    items: ["jQuery", "Vue.js"],
  },
  {
    title: "Database",
    icon: <FaDatabase />,
    items: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Tools",
    icon: <FaDocker />,
    items: ["Git", "Docker", "Linux"],
  },
  {
    title: "AWS",
    icon: <FaAws />,
    items: ["S3", "Lambda", "Secrets Manager", "IAM roles"],
  },
];

const achievements = [
  "Reduced a slow query from 30 minutes to 0.3 seconds.",
  "Fixed S3 listing logic beyond the first 1,000 objects.",
  "Designed safer stock operations with locking strategies.",
  "Reviewed and corrected AI-generated code before integration.",
];

const PortfolioDashboard: React.FC = () => {
  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar" aria-label="Portfolio navigation">
        <a href="#home" className="dashboard-logo" aria-label="Home">
          PQ
        </a>

        <nav className="dashboard-nav">
          {navItems.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              <span>{item.icon}</span>
              <strong>{item.label}</strong>
            </a>
          ))}
        </nav>

        <p className="sidebar-note">Building reliable web systems that keep business data correct.</p>
      </aside>

      <section className="dashboard-canvas">
        <article className="dashboard-panel intro-panel" id="home">
          <div className="intro-meta">Software Engineer & Full-stack Developer</div>
          <p className="intro-name">Phan Quang Thai</p>
          <h1>Portfolio</h1>
          <h2>I build maintainable systems with clear business logic.</h2>
          <p className="intro-copy">
            Backend-focused Software Engineer with 3 years of full-stack web development
            experience in PHP, Laravel, CakePHP, MySQL, and production support.
          </p>

          <div className="intro-actions">
            <a href="#projects" className="dashboard-button">
              View Work <FaExternalLinkAlt />
            </a>
            <a href="#contact" className="dashboard-button ghost">
              Contact Me <FaPaperPlane />
            </a>
          </div>

          <div className="dashboard-stats">
            {stats.map((stat) => (
              <div className="dashboard-stat" key={stat.label}>
                <span>{stat.icon}</span>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel portrait-panel" aria-label="Profile card">
          <div className="portrait-frame">
            {profileImages.map((imagePath, index) => (
              <img
                key={imagePath}
                src={getPublicImageUrl(imagePath)}
                alt={index === 0 ? "Phan Quang Thai" : `Portfolio portrait ${index + 1}`}
                className="portrait-slide"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
          <div className="signature">Thai Phan</div>
          <p>Code. Analyze. Improve.</p>
        </article>

        <article className="dashboard-panel about-panel" id="about">
          <div className="panel-heading">
            <FaUser />
            <h2>About Me</h2>
          </div>
          <p>
            I maintain production systems, develop business modules, improve data integrity,
            analyze query performance, and support clients through root cause analysis.
          </p>

          <ul className="contact-facts">
            <li>
              <FaMapMarkerAlt />
              Ho Chi Minh City, Viet Nam
            </li>
            <li>
              <FaEnvelope />
              <a href="mailto:thaiphan1912@gmail.com">thaiphan1912@gmail.com</a>
            </li>
            <li>
              <FaGithub />
              <a href="https://github.com/pqthai1912" target="_blank" rel="noopener noreferrer">
                github.com/pqthai1912
              </a>
            </li>
          </ul>
        </article>

        <article className="dashboard-panel experience-panel" id="experience">
          <div className="panel-heading spread">
            <span>
              <FaBriefcase />
              <h2>Experience</h2>
            </span>
            <a href="#projects">View Cases</a>
          </div>

          <div className="timeline">
            {experiences.map((item) => (
              <section className="timeline-item" key={`${item.project}-${item.period}`}>
                <time>{item.period}</time>
                <h3>{item.role}</h3>
                <strong>{item.project}</strong>
                <p>{item.summary}</p>
                <div className="mini-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        <article className="dashboard-panel projects-panel" id="projects">
          <div className="panel-heading spread">
            <span>
              <FaBriefcase />
              <h2>Featured Projects</h2>
            </span>
            <a href="#experience">Experience</a>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <section className="dashboard-project" key={project.title}>
                <div className="project-placeholder" aria-hidden="true">
                  <span>{project.title}</span>
                </div>
                <div className="project-body">
                  <time>{project.period}</time>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="mini-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </article>

        <article className="dashboard-panel skills-panel" id="skills">
          <div className="panel-heading">
            <FaCode />
            <h2>Skills & Expertise</h2>
          </div>

          <div className="skill-matrix">
            {skillGroups.map((group) => (
              <section className="skill-block" key={group.title}>
                <div>
                  {group.icon}
                  <h3>{group.title}</h3>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="skill-bars">
            <div>
              <span>Problem Solving</span>
              <strong>95%</strong>
            </div>
            <progress value="95" max="100" />
            <div>
              <span>System Design</span>
              <strong>90%</strong>
            </div>
            <progress value="90" max="100" />
            <div>
              <span>Communication</span>
              <strong>88%</strong>
            </div>
            <progress value="88" max="100" />
          </div>
        </article>

        <article className="dashboard-panel achievement-panel">
          <div className="panel-heading">
            <FaTrophy />
            <h2>Achievements</h2>
          </div>

          <ul>
            {achievements.map((achievement) => (
              <li key={achievement}>
                <FaStar />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="dashboard-panel connect-panel" id="contact">
          <div className="panel-heading">
            <FaPaperPlane />
            <h2>Let's Connect</h2>
          </div>
          <p>
            Open to engineering opportunities where I can keep growing technical ownership
            and contribute to reliable business systems.
          </p>

          <a href="mailto:thaiphan1912@gmail.com" className="dashboard-button wide">
            Get In Touch <FaPaperPlane />
          </a>

          <div className="social-list">
            <a href="https://linkedin.com/in/pqthai1912" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
              LinkedIn
            </a>
            <a href="https://github.com/pqthai1912" target="_blank" rel="noopener noreferrer">
              <FaGithub />
              GitHub
            </a>
          </div>
        </article>

        <footer className="dashboard-footer">
          <span>© {new Date().getFullYear()} Phan Quang Thai. All rights reserved.</span>
          <span>Built with focus. Designed for clarity.</span>
        </footer>
      </section>
    </main>
  );
};

export default PortfolioDashboard;
