import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import { getPublicImageUrl } from "../utils/imageUtils";

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsRotating, setStatsRotating] = useState(false);

  // Handle navigation click
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

  // Set up intersection observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Once visible, no need to observe anymore
      }
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // Set up statistics rotation animation
  useEffect(() => {
    if (!isVisible || !statsRef.current) return;

    // Start stats rotation after initial animations complete
    const statsTimer = setTimeout(() => {
      setStatsRotating(true);
    }, 3000);

    return () => clearTimeout(statsTimer);
  }, [isVisible]);

  // Function to add animated stats classes based on visibility
  const getStatClass = (index: number) => {
    if (!isVisible) return '';
    if (statsRotating) return 'stat-animated';
    
    const delayClass = `delay-${index}`;
    return `stat-animated ${delayClass}`;
  };

  return (
    <section id="about" className={`about ${isVisible ? 'visible' : ''}`} ref={aboutRef}>
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
            
            <div className="about-stats" ref={statsRef}>
              <div className="stat">
                <span className={`stat-number ${getStatClass(0)}`}>2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className={`stat-number ${getStatClass(1)}`}>5+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className={`stat-number ${getStatClass(2)}`}>10+</span>
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
