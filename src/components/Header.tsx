import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

// Add the currentSection prop to the component props
interface HeaderProps {
  currentSection?: string | null;
}

const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // Add a state to track if activeSection is from click
  const [isActivatedByClick, setIsActivatedByClick] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const typingRef = useRef<HTMLDivElement>(null);
  const lastUpdatedHash = useRef<string>('home');
  // Add a flag to prevent scroll handling during programmatic scrolls
  const isScrollingProgrammatically = useRef<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 834;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
      }
    };
    
    // Check on mount
    checkMobile();
    
    // Add listener for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Reset typing animation periodically
  useEffect(() => {
    const resetTyping = () => {
      if (typingRef.current) {
        // Reset the animation by removing and adding the class
        typingRef.current.style.animation = 'none';
        typingRef.current.style.width = '0'; // Reset width explicitly
        setTimeout(() => {
          if (typingRef.current) {
            typingRef.current.style.animation = '';
            typingRef.current.classList.remove('typing-animation');
            void typingRef.current.offsetWidth; // Trigger reflow
            typingRef.current.classList.add('typing-animation');
          }
        }, 100);
      }
    };

    // Set interval to reset typing animation
    const interval = setInterval(() => {
      resetTyping();
    }, 8000); // Reset every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // Check hash in URL when loading page
  useEffect(() => {
    // Get hash from URL (remove #)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Set active menu based on hash
      setActiveSection(hash);
      lastUpdatedHash.current = hash;
      
      // Scroll to corresponding section
      const element = document.getElementById(hash);
      if (element) {
        // Small timeout to ensure DOM has rendered
        setTimeout(() => {
          isScrollingProgrammatically.current = true;
          element.scrollIntoView({ behavior: 'auto' });
          setTimeout(() => {
            isScrollingProgrammatically.current = false;
          }, 100);
        }, 100);
      }
    }
  }, []); // Run once when component mounts

  // Use currentSection to update activeSection if provided
  useEffect(() => {
    if (currentSection) {
      setActiveSection(currentSection);
      setIsActivatedByClick(true); // Assume currentSection is from a click
    }
  }, [currentSection]);

  // Improved scroll handler with better section detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Don't update active section during transitions or programmatic scrolls
      if (isTransitioning || isScrollingProgrammatically.current) return;
      
      // CHANGE: Set isActivatedByClick to false during scroll
      // This ensures active state is removed during scrolling
      if (isActivatedByClick) {
        setIsActivatedByClick(false);
      }
      
      const sections = [
        'home', 'about', 'projects', 'skills', 
        'experience', 'education', 'certifications', 'english-ability', 'contact'
      ];
      
      // Find which section is most visible in viewport
      let maxVisibleSection = { id: 'home', visiblePixels: 0 };
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how many pixels of this section are visible in viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visiblePixels = Math.max(0, visibleBottom - visibleTop);
        
        // Special case for sections at the top of the page
        if (rect.top <= 100 && rect.top > -100) {
          // If section is close to top, prioritize it
          if (visiblePixels > maxVisibleSection.visiblePixels || 
              (section === 'home' && rect.top >= 0)) {
            maxVisibleSection = { id: section, visiblePixels };
          }
        } 
        // Normal case - whichever section has most pixels visible
        else if (visiblePixels > maxVisibleSection.visiblePixels) {
          maxVisibleSection = { id: section, visiblePixels };
        }
      }
      
      // CHANGE: Only update URL hash, but don't set active section during scroll
      if (maxVisibleSection.id !== lastUpdatedHash.current) {
        lastUpdatedHash.current = maxVisibleSection.id;
        window.history.replaceState(null, '', `#${maxVisibleSection.id}`);
      }
    };

    // Add throttled scroll handler for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

      window.addEventListener('scroll', scrollListener, { passive: true });
      return () => window.removeEventListener('scroll', scrollListener);
  }, [activeSection, isTransitioning, isActivatedByClick]);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
        lastUpdatedHash.current = hash;
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Improved scroll implementation for snap effect with transitions
  const handleNavClick = (sectionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    if (isTransitioning) return;
    
    // Set transitioning state to prevent multiple clicks
    setIsTransitioning(true);
    
    // Set active section immediately for better UX
    setActiveSection(sectionId);
    // CHANGE: Mark this as activated by click
    setIsActivatedByClick(true);
    lastUpdatedHash.current = sectionId;
    
    // Close mobile menu if open
    if (menuOpen) setMenuOpen(false);
    
    // Update URL hash without scrolling
    window.history.pushState(null, '', `#${sectionId}`);
    
    // Get element and scroll directly to it
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Prevent scroll handler from triggering during programmatic scroll
      isScrollingProgrammatically.current = true;
      
      // Use scrollIntoView for better snap effect
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        isScrollingProgrammatically.current = false;
      }, 650);
    } else {
      setIsTransitioning(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a 
          href="#home" 
          className="logo" 
          onClick={(e) => handleNavClick('home', e)}
        >
          PQT
        </a>
        
        <button 
          className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                className={activeSection === 'home' && isActivatedByClick ? 'active' : ''}
                onClick={(e) => handleNavClick('home', e)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === 'about' && isActivatedByClick ? 'active' : ''}
                onClick={(e) => handleNavClick('about', e)}
              >
                About Me
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={activeSection === 'projects' && isActivatedByClick ? 'active' : ''}
                onClick={(e) => handleNavClick('projects', e)}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={activeSection === 'skills' && isActivatedByClick ? 'active' : ''}
                onClick={(e) => handleNavClick('skills', e)}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                className={activeSection === 'experience' && isActivatedByClick ? 'active' : ''}
                onClick={(e) => handleNavClick('experience', e)}
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#certifications" 
                className={activeSection === 'certifications' && isActivatedByClick ? 'active' : ''}
                onClick={(e) => handleNavClick('certifications', e)}
              >
                Certifications
              </a>
            </li>
            <li className="mobile-hide">
              <a 
                href="#english-ability" 
                className={activeSection === 'english-ability' && isActivatedByClick ? 'active' : ''}
                onClick={(e) => handleNavClick('english-ability', e)}
              >
                Languages
              </a>
            </li>
            <li className="mobile-hide">
              <a 
                href="#education" 
                className={activeSection === 'education' && isActivatedByClick ? 'active' : ''}
                onClick={(e) => handleNavClick('education', e)}
              >
                Education
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`contact-link ${activeSection === 'contact' && isActivatedByClick ? 'active-contact' : ''}`}
                onClick={(e) => handleNavClick('contact', e)}
                onMouseEnter={() => {
                  if (typingRef.current) {
                    typingRef.current.style.animation = 'none';
                    setTimeout(() => {
                      if (typingRef.current) {
                        typingRef.current.style.animation = '';
                      }
                    }, 10);
                  }
                }}
              >
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <span className="text-container">
                  <span className={`text ${isMobile ? '' : 'typing-animation'}`} ref={isMobile ? null : typingRef}>Contact</span>
                </span>
              </a>
            </li>
            
            {/* Mobile footer links */}
            {isMobile && (
              <li className="mobile-footer">
                <div className="mobile-social-links">
                  <a href="https://github.com/pqthai1912" target="_blank" rel="noopener noreferrer" className="social-icon github">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/pqthai1912" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="mailto:thaiphan1912@gmail.com" className="social-icon email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                </div>
                <div className="mobile-copyright">
                  © {new Date().getFullYear()} Phan Quang Thai
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
