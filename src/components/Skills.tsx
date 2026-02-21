import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import "./Skills.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type SkillGroup = {
  title: string;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    items: ["PHP", "JavaScript"],
  },
  {
    title: "Backend Frameworks",
    items: ["Laravel", "CakePHP"],
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "jQuery", "Vue.js", "Inertia.js"],
  },
  {
    title: "Databases",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker"],
  },
  {
    title: "Cloud (AWS)",
    items: ["S3", "Lambda", "Secrets Manager", "IAM roles"],
  },
  {
    title: "Soft Skills",
    items: [
      "Problem-solving",
      "Collaboration",
      "Customer support",
      "Business logic communication",
    ],
  },
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
        <div className="skills-groups">
          {skillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.title}
              className="skill-group"
              custom={groupIndex}
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              <h3>{group.title}</h3>
              <ul className="skills-list">
                {group.items.map((item) => (
                  <li key={item} className="skill-item">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Skills;
