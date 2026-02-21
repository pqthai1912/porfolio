import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">Phan Quang Thai</h3>
            <p className="footer-description">
              PHP Developer with 3 years of full-stack experience in Laravel and CakePHP, focused on clean code and reliable delivery.
            </p>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">More</h4>
            <ul className="footer-links">
              <li><a href="#experience">Experience</a></li>
              <li><a href="#certifications">Certifications</a></li>
              <li><a href="#english-ability">Languages</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>
            <div className="social-links">
              <a href="mailto:thaiphan1912@gmail.com">thaiphan1912@gmail.com</a>
              <a href="tel:0763666147">0763 666 147</a>
              <a href="https://github.com/pqthai1912" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/pqthai1912" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} <span className="footer-signature">Phan Quang Thai</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
