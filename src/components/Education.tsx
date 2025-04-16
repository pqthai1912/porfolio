import React from "react";
import AnimatedSection from "./AnimatedSection";
import "./Education.css";

const Education: React.FC = () => {
  return (
    <AnimatedSection id="education" className="education">
      <h2>Education</h2>
      <div className="education-item">
        <h3>Bachelor of Software Engineering</h3>
        <span className="period">Sep 2019 - Sep 2023</span>
        <p>Ton Duc Thang University</p>
      </div>
    </AnimatedSection>
  );
};

export default Education;
