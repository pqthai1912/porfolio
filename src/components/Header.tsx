import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const typingRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 834);
    };
    
    // Check on mount
    checkMobile();
    
    // Add listener for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Kiểm tra hash trong URL khi load trang
  useEffect(() => {
    // Lấy hash từ URL (loại bỏ dấu #)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Đặt menu active dựa trên hash
      setActiveSection(hash);
      
      // Đồng thời scroll đến phần tương ứng
      const element = document.getElementById(hash);
      if (element) {
        // Sử dụng timeout nhỏ để đảm bảo DOM đã render xong
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'auto' });
        }, 100);
      }
    }
  }, []); // Chỉ chạy một lần khi component mount

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Don't update active section during transitions
      if (isTransitioning) return;
      
      const sections = [
        'home', 'about', 'projects', 'skills', 
        'experience', 'education', 'certifications', 'contact'
      ];
      
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      }) || 'home';
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransitioning]);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
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
    
    if (isTransitioning || activeSection === sectionId) return;
    
    // Set transitioning state to prevent multiple clicks
    setIsTransitioning(true);
    
    // Set active section immediately for better UX
    setActiveSection(sectionId);
    
    // Close mobile menu if open
    if (menuOpen) setMenuOpen(false);
    
    // Update URL hash without scrolling
    window.history.pushState(null, '', `#${sectionId}`);
    
    // Get element and scroll directly to it
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Use scrollIntoView for better snap effect
      targetElement.scrollIntoView({ behavior: 'smooth' });
      
      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Slightly longer than transition duration
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
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => handleNavClick('home', e)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => handleNavClick('about', e)}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={(e) => handleNavClick('projects', e)}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={(e) => handleNavClick('skills', e)}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={(e) => handleNavClick('experience', e)}
              >
                Experience
              </a>
            </li>
            <li className="mobile-hide">
              <a 
                href="#education" 
                className={activeSection === 'education' ? 'active' : ''}
                onClick={(e) => handleNavClick('education', e)}
              >
                Education
              </a>
            </li>
            <li className="mobile-hide">
              <a 
                href="#certifications" 
                className={activeSection === 'certifications' ? 'active' : ''}
                onClick={(e) => handleNavClick('certifications', e)}
              >
                Certifications
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`contact-link ${activeSection === 'contact' ? 'active-contact' : ''}`}
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
                  <span className="text typing-animation" ref={typingRef}>Contact</span>
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
