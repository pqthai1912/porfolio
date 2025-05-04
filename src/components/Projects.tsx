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
  link?: string;
};

const projects: Project[] = [
  {
    title: "Corporate Food Ordering System",
    period: "Sep 2023 - Jan 2024",
    description:
      "Developed a food ordering system for corporate clients using PHP (Laravel), JQuery, MySQL, and Amazon S3.",
    technologies: "PHP, Laravel, JQuery, MySQL, Amazon S3",
  },
  {
    title: "Real Estate Management Platform",
    period: "April 2023 - Present",
    description:
      "Managed real estate properties using PHP (CakePHP) and improved system reliability by resolving S3 retrieval errors.",
    technologies: "PHP, CakePHP, JQuery, MySQL, Docker, Amazon S3",
  },
  {
    title: "Restaurant Management System",
    period: "April 2024 - Aug 2024",
    description:
      "Built a reservation and pre-order system using PHP (CakePHP) and introduced a queue management feature.",
    technologies: "PHP, CakePHP, JQuery, Vue, PostgreSQL, Amazon S3",
  },
  {
    title: "Electric Charger Management System",
    period: "Sep 2024 - Present",
    description:
      "Created a sub-module for managing electric chargers, applying locking techniques to prevent concurrent updates.",
    technologies: "PHP, Laravel, JQuery, MySQL, Amazon S3",
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
