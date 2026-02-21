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
    title: "Corporate Food Ordering System",
    period: "Sep 2023 - Jan 2024",
    description:
      "Engineered a food ordering system for corporate clients using PHP (Laravel), jQuery, MySQL, and Amazon S3.",
    technologies: "PHP, Laravel, JQuery, MySQL, Amazon S3",
    highlights: [
      "Implemented features for delivery operations and invoicing.",
      "Ensured system stability and performance through regular monitoring.",
    ],
  },
  {
    title: "Real Estate Management Platform",
    period: "Apr 2023 - Dec 2025",
    description:
      "Managed real estate properties and services using PHP (CakePHP), jQuery, MySQL, Amazon S3, and Docker.",
    technologies: "PHP, CakePHP, JQuery, MySQL, Docker, Amazon S3",
    highlights: [
      "Resolved Amazon S3 retrieval errors for over 1,000 objects, improving system reliability.",
      "Oversaw system maintenance, feature development, version upgrades, and customer support.",
    ],
  },
  {
    title: "Restaurant Management System",
    period: "Apr 2024 - Aug 2024",
    description:
      "Built a reservation and pre-order system using PHP (CakePHP), jQuery, Vue, PostgreSQL, and Amazon S3.",
    technologies: "PHP, CakePHP, JQuery, Vue, PostgreSQL, Amazon S3",
    highlights: [
      "Introduced a queue management feature to assign and display ticket numbers.",
      "Sustained and added new features to improve user experience.",
    ],
  },
  {
    title: "Electric Charger Management System",
    period: "Sep 2024 - Dec 2025",
    description:
      "Created a sub-module for managing electric chargers using PHP (Laravel), jQuery, MySQL, and Amazon S3.",
    technologies: "PHP, Laravel, JQuery, MySQL, Amazon S3",
    highlights: [
      "Evaluated and applied pessimistic and optimistic locking to prevent concurrent updates.",
      "Crafted intuitive UI that maintained data integrity during stock operations.",
    ],
  },
  {
    title: "Employee Evaluation System",
    period: "Jan 2026 - Present",
    description:
      "Delivered end-to-end implementation with Inertia.js and Vue.js in an AI-assisted workflow.",
    technologies: "PHP, Laravel, Inertia.js, Vue.js, MySQL",
    highlights: [
      "Handled migrations, coding, test cases, and testing from start to release.",
      "Improved delivery efficiency by managing multiple tasks concurrently.",
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
