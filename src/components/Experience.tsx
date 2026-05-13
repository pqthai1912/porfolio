import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import "./Experience.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Experience: React.FC = () => {
  const achievements = [
    "Maintained production systems and developed business modules across Laravel and CakePHP applications.",
    "Improved data integrity through concurrency control, validation-focused UI flows, and careful business logic analysis.",
    "Analyzed query performance and optimized slow database operations by reviewing execution plans and filtering conditions.",
    "Supported client-facing issues with root cause analysis, technical investigation, and clear communication of business logic.",
    "Used AI-assisted workflows for repetitive implementation tasks while manually reviewing, correcting, and optimizing generated code before integration.",
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
          <h3>Briswell Viet Nam Co., Ltd | Software Engineer</h3>
          <span className="period">Apr 2023 - Present</span>
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
