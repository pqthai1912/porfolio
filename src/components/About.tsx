import React from "react";
import "./About.css";
import { getPublicImageUrl } from "../utils/imageUtils";

const About: React.FC = () => {
  const handleNavClick = (sectionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    // Update URL hash without scrolling
    window.history.pushState(null, '', `#${sectionId}`);
    
    // Get element and scroll directly to it with snap effect
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Use scrollIntoView for better snap effect
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-headline">
          <h6>About Me</h6>
          <h2>Dedicated PHP Developer</h2>
          <p className="tagline">
            With 2 years of experience crafting exceptional web experiences
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-image">
            <img src={getPublicImageUrl('/sunset.jpg')} alt="Phan Quang Thai" />
          </div>
          
          <div className="about-text">
            <p>
              I specialize in developing robust and scalable web applications using modern PHP frameworks like Laravel and CakePHP. My passion lies in creating elegant solutions to complex problems through clean, maintainable code.
            </p>
            
            <p>
              Throughout my professional journey, I've successfully built and optimized numerous web applications, focusing on performance, security, and user experience. I thrive in collaborative environments and am constantly expanding my technical expertise.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
            
            <a 
              href="#contact" 
              className="btn"
              onClick={(e) => handleNavClick('contact', e)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
