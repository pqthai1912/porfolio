import React from "react";
import AnimatedSection from "./AnimatedSection";
import "./Experience.css";

const Experience: React.FC = () => {
  return (
    <AnimatedSection id="experience" className="experience">
      <h2>Experience</h2>
      <div className="experience-item">
        <h3>Briswell Viet Nam Co., Ltd | Full-stack Developer</h3>
        <span className="period">Feb 2023 - Present</span>
        <p>
          Developed and maintained web applications using Laravel and CakePHP.
          Achieved the team's lowest bug rate through precise test cases and
          delivered root cause analysis reports to clients.
        </p>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
