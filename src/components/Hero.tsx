import React from "react";
import "./Hero.css";
import { getPublicImageUrl } from "../utils/imageUtils";

const Hero: React.FC = () => {
  const heroStyle = {
    backgroundImage: `url(${getPublicImageUrl('/background.jpeg')})`,
  };

  const handleNavClick = (sectionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    // Update URL hash without scrolling
    window.history.pushState(null, '', `#${sectionId}`);
    
    // Get element and scroll directly to it with snap effect
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Use scrollIntoView for better snap effect
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero" style={heroStyle}>
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            <span className="hero-subtitle">Phan Quang Thai</span>
            <span className="hero-title">PHP Developer.</span>
            <span className="hero-title">Problem Solver.</span>
            <span className="hero-title">Creator.</span>
          </h1>
          
          <p className="hero-description">
            Building maintainable Laravel/CakePHP systems and growing toward a Vietnam-Japan BrSE role.
          </p>
          
          <div className="hero-cta">
            <a 
              href="#projects" 
              className="btn btn-primary"
              onClick={(e) => handleNavClick('projects', e)}
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="btn btn-secondary"
              onClick={(e) => handleNavClick('contact', e)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="hero-image">
        <div className="hero-image-container">
          <img 
            src={getPublicImageUrl('/avatar.jpg')} 
            alt="Phan Quang Thai" 
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow">
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
