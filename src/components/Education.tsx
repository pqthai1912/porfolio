import React, { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import "./Education.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { env } from "../utils/env";

const Education: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Lock scrolling when modal is open
  useEffect(() => {
    if (isImageExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isImageExpanded]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        delay: 0.3
      } 
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.7,
        delay: 0.5
      } 
    }
  };

  const toggleImageExpand = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  // Certificate image path - using PNG format
  const certificateImage = `${env.PUBLIC_URL}/Bachelors_degree.png`;

  return (
    <section id="education" className="education-section">
      <AnimatedSection className="education">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          Education
        </motion.h2>
        <motion.div 
          className="education-timeline"
          initial="hidden"
          animate={controls}
          variants={contentVariants}
        >
          <div className="education-item">
            <div className="education-content">
              <h3>Bachelor of Software Engineering</h3>
              <span className="period">Sep 2019 - Sep 2023</span>
              <p className="institution">Ton Duc Thang University</p>
              <p className="description">
                Graduated with honors, specializing in software development 
                and system architecture. Completed coursework in algorithms, 
                data structures, web development, and database systems.
              </p>
              <div className="education-details">
                <div className="detail-item">
                  <span className="detail-label">Major:</span>
                  <span className="detail-value">Software Engineering</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">GPA:</span>
                  <span className="detail-value">3.8/4.0</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Key Courses:</span>
                  <span className="detail-value">Object-Oriented Programming, Algorithms, Database Systems, Web Development</span>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="certificate-container"
              initial="hidden"
              animate={controls}
              variants={imageVariants}
            >
              <div 
                className="certificate-image-wrapper"
                onClick={toggleImageExpand}
              >
                <img 
                  src={certificateImage} 
                  alt="Bachelor's Degree Certificate" 
                  className="certificate-image"
                />
                <div className="certificate-overlay">
                  <span>Click to expand</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Modal for expanded image */}
      {isImageExpanded && (
        <div className="expanded-overlay" onClick={toggleImageExpand}>
          <div className="expanded-image-container" onClick={(e) => e.stopPropagation()}>
            <img 
              src={certificateImage} 
              alt="Bachelor's Degree Certificate" 
              className="expanded-certificate-image"
            />
            <button 
              className="close-button" 
              onClick={(e) => {
                e.stopPropagation();
                toggleImageExpand();
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Education;
