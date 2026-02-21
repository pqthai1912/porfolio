import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import "./Experience.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Experience: React.FC = () => {
  const achievements = [
    "Developed and maintained web applications using Laravel and CakePHP, focusing on UI and module enhancements.",
    "In 2025 (Real Estate project), consistently met the company target of < 3% bug rate across all four quarters by creating precise test cases and improving QA coverage.",
    "Delivered root cause analysis reports to clients, strengthening trust and service quality.",
    "Onboarded a new team member by explaining project business logic and workflows.",
  ];

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

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        delay: 0.3
      } 
    }
  };

  return (
    <section id="experience" className="experience-section">
      <AnimatedSection className="experience">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          Experience
        </motion.h2>
        <motion.div 
          className="experience-item"
          initial="hidden"
          animate={controls}
          variants={contentVariants}
        >
          <h3>Briswell Viet Nam Co., Ltd | Full-stack Developer</h3>
          <span className="period">Feb 2023 - Present</span>
          <ul className="experience-points">
            {achievements.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </motion.div>
      </AnimatedSection>
    </section>
  );
};

export default Experience;
