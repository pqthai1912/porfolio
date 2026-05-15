import React, { useEffect, useState } from "react";
import {
  FaAws,
  FaBriefcase,
  FaCode,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaExternalLinkAlt,
  FaCertificate,
  FaGithub,
  FaGraduationCap,
  FaHome,
  FaLanguage,
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

type ResumeEntry = {
  title: string;
  period: string;
  bullets?: string[];
};

type ExperienceHighlight = {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
};

type CredentialGroup = {
  title: string;
  icon: React.ReactNode;
  items: {
    title: string;
    meta: string;
    detail?: string;
  }[];
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

const workExperienceEntries: ResumeEntry[] = [
  {
    title: "Briswell Viet Nam Co., Ltd | Full-stack Developer",
    period: "Feb 2023 - Present",
    bullets: [
      "Developed and maintained production web applications using Laravel, CakePHP, MySQL, JavaScript, Docker, and AWS services.",
      "Handled feature development, maintenance, version upgrades, customer support, and root cause analysis for production issues.",
      "In the 2025 Real Estate project, consistently met the company target of < 3% bug rate across all four quarters by improving test case quality and QA coverage.",
      "Supported team onboarding by explaining business logic, workflows, and project-specific implementation details.",
    ],
  },
];

const experienceStack = ["Laravel", "CakePHP", "MySQL", "JavaScript", "Docker", "AWS"];

const experienceHighlights: ExperienceHighlight[] = [
  {
    label: "Production Scope",
    value: "Web Applications",
    detail: "Feature development, maintenance, version upgrades, customer support, and RCA.",
    icon: <FaServer />,
  },
  {
    label: "Quality Signal",
    value: "< 3% Bug Rate",
    detail: "2025 Real Estate project target met across all four quarters with stronger test cases and QA coverage.",
    icon: <FaTrophy />,
  },
  {
    label: "Team Context",
    value: "Onboarding Support",
    detail: "Explained business logic, workflows, and project-specific implementation details.",
    icon: <FaUser />,
  },
];

const credentialGroups: CredentialGroup[] = [
  {
    title: "Education",
    icon: <FaGraduationCap />,
    items: [
      {
        title: "Bachelor of Software Engineering",
        meta: "Ton Duc Thang University | Sep 2019 - Sep 2023",
        detail: "Major: Software Engineering. Awards: University Scholarship (2020-2021, 2021-2022, 2022-2023).",
      },
    ],
  },
  {
    title: "Certifications",
    icon: <FaCertificate />,
    items: [
      {
        title: "Web Applications for Everybody Specialization",
        meta: "University of Michigan",
      },
      {
        title: "HTML, CSS, and JavaScript for Web Developers",
        meta: "Johns Hopkins University",
      },
      {
        title: "PET B1 Certificate",
        meta: "Cambridge Assessment English",
      },
    ],
  },
  {
    title: "Languages",
    icon: <FaLanguage />,
    items: [
      {
        title: "English",
        meta: "PET B1 Certificate | Pass at Grade C | Score 142",
        detail: "Reading 141, Writing 155, Listening 123, Speaking 150.",
      },
      {
        title: "Japanese",
        meta: "Currently learning (N5)",
      },
    ],
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
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return undefined;
    }

    const pickActiveSection = () => {
      const activationLine = Math.min(window.innerHeight * 0.42, 260);
      const currentSection =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= activationLine && rect.bottom > activationLine;
        }) ?? sections.reduce((closest, section) => {
          const closestDistance = Math.abs(closest.getBoundingClientRect().top - activationLine);
          const sectionDistance = Math.abs(section.getBoundingClientRect().top - activationLine);

          return sectionDistance < closestDistance ? section : closest;
        }, sections[0]);

      setActiveSection(currentSection.id);
    };

    pickActiveSection();
    window.addEventListener("scroll", pickActiveSection, { passive: true });
    window.addEventListener("resize", pickActiveSection);

    return () => {
      window.removeEventListener("scroll", pickActiveSection);
      window.removeEventListener("resize", pickActiveSection);
    };
  }, []);

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar" aria-label="Portfolio navigation">
        <a href="#home" className="dashboard-logo" aria-label="Home">
          PQ
        </a>

        <nav className="dashboard-nav">
          {navItems.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              className={activeSection === item.id ? "active" : undefined}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
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

        <div className="profile-stack">
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

          <article className="dashboard-panel credentials-panel" aria-label="Education certifications and languages">
            <div className="panel-heading">
              <FaGraduationCap />
              <h2>Credentials</h2>
            </div>

            <div className="credential-groups">
              {credentialGroups.map((group) => (
                <section className="credential-group" key={group.title}>
                  <div className="credential-group-heading">
                    {group.icon}
                    <h3>{group.title}</h3>
                  </div>
                  <div className="credential-items">
                    {group.items.map((item) => (
                      <article className="credential-item" key={`${group.title}-${item.title}`}>
                        <strong>{item.title}</strong>
                        <span>{item.meta}</span>
                        {item.detail && <p>{item.detail}</p>}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>

        <article className="dashboard-panel experience-panel" id="experience">
          <div className="panel-heading spread">
            <span>
              <FaBriefcase />
              <h2>Experience</h2>
            </span>
            <a href="#projects">View Cases</a>
          </div>

          <div className="resume-stack">
            {workExperienceEntries.map((entry) => (
              <section className="resume-section" key={entry.title}>
                <div className="resume-entry">
                  <div className="resume-entry-header">
                    <strong>{entry.title}</strong>
                    <time>{entry.period}</time>
                  </div>

                  {entry.bullets && (
                    <ul className="resume-points">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="experience-context" aria-label="Experience context">
            {experienceHighlights.map((item) => (
              <section className="experience-context-card" key={item.label}>
                <span>{item.icon}</span>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </section>
            ))}
          </div>

          <div className="experience-stack-strip" aria-label="Technology stack">
            <span>Stack</span>
            <div>
              {experienceStack.map((item) => (
                <strong key={item}>{item}</strong>
              ))}
            </div>
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
