import React from "react";
import AnimatedSection from "./AnimatedSection";
import "./About.css";

const About: React.FC = () => {
  return (
    <AnimatedSection id="about" className="about">
      <h2>About Me</h2>
      <p>
        Dedicated PHP Developer with 2 years of experience in full-stack web
        development, specializing in Laravel and CakePHP. Proven ability to
        build scalable web applications and solve performance issues.
      </p>
      <img className="profile-img" src="avatar.jpg" alt="Phan Quang Thai" />
    </AnimatedSection>
  );
};

export default About;
