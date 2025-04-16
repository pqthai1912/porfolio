import React from "react";
import AnimatedSection from "./AnimatedSection";
import "./ContactMe.css";

const ContactMe: React.FC = () => {
  return (
    <AnimatedSection id="contact-me" className="contact-me">
      <h2>Contact Me</h2>
      <p>You can reach me via:</p>
      <div className="contact-links">
        <a
          href="mailto:thaiphan1912@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          Gmail
        </a>
        <a
          href="https://github.com/pqthai1912"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/pqthai1912"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          LinkedIn
        </a>
      </div>
    </AnimatedSection>
  );
};

export default ContactMe;
