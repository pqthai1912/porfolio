import React from "react";
import AnimatedSection from "./AnimatedSection";
import "./Skills.css";

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
  return (
    <AnimatedSection id="skills" className="skills">
      <h2>Skills</h2>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">
            {skill}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
};

export default Skills;
