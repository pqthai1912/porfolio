import React, { useEffect, useState } from "react";
import AnimatedSection from './AnimatedSection';
import "./Certifications.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaExpand } from "react-icons/fa";

type Certification = {
  id: number;
  title: string;
  organization: string;
  bgColor: string;
  pdfPath?: string;
  externalUrl?: string;
};

const Certifications: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Web Applications for Everybody Specialization",
      organization: "University of Michigan",
      pdfPath: "/porfolio/Certificate_1.pdf",
      bgColor: "#b9883c"
    },
    {
      id: 2,
      title: "HTML, CSS, and JavaScript for Web Developers",
      organization: "Johns Hopkins University",
      pdfPath: "/porfolio/Certificate_2.pdf",
      bgColor: "#8f5b2c"
    },
    {
      id: 3,
      title: "PET B1 Certificate",
      organization: "Cambridge Assessment English",
      externalUrl: "https://www.cambridgeenglish.org/exams-and-tests/preliminary/",
      bgColor: "#a87433"
    }
  ];

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        delay: 0.3 + (i * 0.1)
      } 
    })
  };

  const openCertificate = (cert: Certification) => {
    if (cert.externalUrl) {
      window.open(cert.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (!cert.pdfPath) return;

    if (isMobile) {
      window.open(cert.pdfPath, "_blank");
    } else {
      setCurrentPdf(cert.pdfPath);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="certifications" className="certifications-section">
      <AnimatedSection className="certifications">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="section-title"
        >
          Certifications
        </motion.h2>
        
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="cert-card"
              custom={index}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              onClick={() => openCertificate(cert)}
            >
              <div 
                className="cert-preview" 
                style={{ backgroundColor: cert.bgColor }}
              >
                <div className="cert-badge">
                  <div className="cert-icon">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" fill="white"/>
                      <path d="M12 15V22M12 22L7 17M12 22L17 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>Certificate</h4>
                </div>
                <div className="cert-overlay">
                  <FaExpand className="expand-icon" />
                  <span className="view-text">
                    {cert.externalUrl
                      ? "Open Link"
                      : isMobile
                        ? "Open PDF"
                        : "View Certificate"}
                  </span>
                </div>
              </div>
              <div className="cert-details">
                <h3>{cert.title}</h3>
                <p>{cert.organization}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {!isMobile && isModalOpen && (
        <div className="pdf-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <iframe 
              src={`${currentPdf}#toolbar=1&navpanes=1&scrollbar=1`}
              className="pdf-frame"
              title="Certificate PDF"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
