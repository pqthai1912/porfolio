import React from "react";
import AnimatedSection from "./AnimatedSection";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <AnimatedSection id="footer" className="footer">
      <p>© {new Date().getFullYear()} Phan Quang Thai. All rights reserved.</p>
    </AnimatedSection>
  );
};

export default Footer;
