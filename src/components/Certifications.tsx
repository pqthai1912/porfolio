import React from "react";
import AnimatedSection from './AnimatedSection';
import "./Certifications.css";

const Certifications: React.FC = () => {
  return (
    <AnimatedSection id="certifications" className="certifications">
      <h2>Certifications</h2>
      <ul className="cert-list">
        <li>
          Web Applications for Everybody Specialization, University of Michigan
        </li>
        <li>
          HTML, CSS, and JavaScript for Web Developers, Johns Hopkins University
        </li>
        <li>PET B1 Certificate, Cambridge Assessment English</li>
      </ul>
    </AnimatedSection>
  );
};

export default Certifications;
