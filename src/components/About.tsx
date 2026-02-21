import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import { getPublicImageUrl } from "../utils/imageUtils";

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsRotating, setStatsRotating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const carouselImages = ["/carousel_1.JPEG", "/carousel_2.JPEG", "/carousel_3.JPEG"];

  // Handle navigation click
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

  // Set up intersection observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Once visible, no need to observe anymore
      }
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible

    const observedElement = aboutRef.current;

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
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

  // Auto-play infinite carousel for About image gallery.
  useEffect(() => {
    if (isCarouselPaused) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [isCarouselPaused, carouselImages.length]);

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
            3 years of full-stack experience with Laravel and CakePHP
          </p>
        </div>
        
        <div className="about-content">
          <div
            className="about-image"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="about-carousel">
              {carouselImages.map((imagePath, index) => (
                <div
                  key={imagePath}
                  className={`about-carousel-slide ${index === currentSlide ? "active" : ""}`}
                  aria-hidden={index !== currentSlide}
                >
                  <img
                    src={getPublicImageUrl(imagePath)}
                    alt={`Portfolio carousel ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="about-text">
            <p>
              Dedicated PHP Developer with 3 years of full-stack web development experience, specializing in Laravel and CakePHP. Experienced in building and maintaining web applications using HTML, CSS, JavaScript, MySQL, Git, Docker, and AWS services.
            </p>
            
            <p>
              I focus on clean, maintainable code with strong attention to performance, security, and user experience. My long-term goal is to grow into a Vietnam-Japan BrSE by improving Japanese communication, requirement clarification, and cross-team collaboration.
            </p>
            
            <div className="about-stats" ref={statsRef}>
              <div className="stat">
                <span className={`stat-number ${getStatClass(0)}`}>3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className={`stat-number ${getStatClass(1)}`}>5+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat">
                <span className={`stat-number ${getStatClass(2)}`}>{"<3%"}</span>
                <span className="stat-label">2025 Bug Rate</span>
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
