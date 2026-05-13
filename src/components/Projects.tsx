import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import "./Projects.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Project = {
  title: string;
  period: string;
  description: string;
  technologies: string;
  highlights: string[];
  link?: string;
};

const projects: Project[] = [
  {
    title: "Real Estate Management Platform",
    period: "Apr 2023 - Dec 2025",
    description:
      "Maintained and enhanced a production real estate management platform, with a focus on module stability, performance, and client support.",
    technologies: "PHP, CakePHP, jQuery, MySQL, Docker, Amazon S3",
    highlights: [
      "Optimized slow SQL queries by reviewing execution plans and improving filtering conditions, reducing query execution time from 30 minutes to 0.3 seconds.",
      "Investigated S3 object listing behavior, identified the pagination and continuation issue, and adjusted retrieval logic to process objects beyond the first 1,000 results.",
      "Maintained and enhanced existing modules, handled version upgrades, and provided root cause analysis reports for client-side issues.",
    ],
  },
  {
    title: "Electric Charger Management System",
    period: "Sep 2023 - Dec 2025",
    description:
      "Developed and improved stock-related workflows for an electric charger management system, with emphasis on concurrency control and data integrity.",
    technologies: "PHP, Laravel, jQuery, MySQL, Amazon S3",
    highlights: [
      "Analyzed use cases and evaluated both pessimistic locking and optimistic locking strategies.",
      "Applied locking strategies based on update conflict risk: pessimistic locking secures data before updates, while optimistic locking allows concurrent reads and validates data versions before updates.",
      "Designed UI flows to reduce invalid operations and maintain data integrity during stock-related actions.",
    ],
  },
  {
    title: "Employee Evaluation System",
    period: "Dec 2025 - Present",
    description:
      "Building an employee evaluation system by translating implementation plans into backend logic, database changes, frontend screens, and test coverage.",
    technologies: "PHP, Laravel, Inertia.js, Vue.js, MySQL",
    highlights: [
      "Read and analyzed implementation plans, clarified business logic, and broke requirements into database migrations, backend logic, frontend screens, and test cases.",
      "Used AI-assisted workflows to speed up implementation, generate initial code ideas, and support repetitive development tasks.",
      "Reviewed AI-generated code manually, provided technical feedback, corrected logic, and optimized code quality before integration.",
    ],
  },
];

const Projects: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.5,
        delay: 0.2 + (i * 0.1)
      } 
    })
  };

  return (
    <section id="projects" className="projects-section">
      <AnimatedSection className="projects">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          Projects
        </motion.h2>
        {projects.map((proj, index) => (
          <motion.div 
            key={index} 
            className="project-item"
            custom={index}
            initial="hidden"
            animate={controls}
            variants={itemVariants}
          >
            <h3>{proj.title}</h3>
            <span className="period">{proj.period}</span>
            <p>{proj.description}</p>
            <p>
              <strong>Technologies:</strong> {proj.technologies}
            </p>
            <ul className="project-highlights">
              {proj.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {proj.link && (
              <a href={proj.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            )}
          </motion.div>
        ))}
      </AnimatedSection>
    </section>
  );
};

export default Projects;
