import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import "./Skills.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills: string[] = [
  "PHP",
  "JavaScript",
  "Laravel",
  "CakePHP",
  "JQuery",
  "MySQL",
  "Git",
  "Docker",
  "Amazon S3",
];

const Skills: React.FC = () => {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.3,
        delay: 0.2 + (i * 0.05)
      } 
    })
  };

  return (
    <section id="skills" className="skills-section">
      <AnimatedSection className="skills">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          Skills
        </motion.h2>
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <motion.li 
              key={index} 
              className="skill-item"
              custom={index}
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
};

export default Skills;
