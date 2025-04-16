import React from "react";
import AnimatedSection from "./AnimatedSection";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <AnimatedSection
      id="hero"
      className="hero"
    >
      <h1>PHAN QUANG THAI</h1>
      <p>PHP Developer | Laravel & CakePHP Expert</p>
    </AnimatedSection>
  );
};

export default Hero;
