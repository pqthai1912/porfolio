import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <AnimatedSection className="header">
      <div className="logo">
        <a href="#hero">Phan Quang Thai</a>
      </div>
      <nav className="nav-desktop">
        <ul className="nav-links">
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#certifications">Certifications</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
          <li>
            <a href="#contact-me">Contact</a>
          </li>
        </ul>
      </nav>

      <div className="mobile-menu-icon" onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {isMobileMenuOpen && (
        <nav className="nav-mobile">
          <ul className="mobile-nav-links">
            <li onClick={toggleMenu}>
              <a href="#hero">Home</a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#about">About</a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#projects">Projects</a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#skills">Skills</a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#experience">Experience</a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#certifications">Certifications</a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#education">Education</a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#contact-me">Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </AnimatedSection>
  );
};

export default Header;
