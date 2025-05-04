import React, { useEffect } from "react";
import AnimatedSection from './AnimatedSection';
import "./Certifications.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Certifications: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const listItemVariants = {
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

  return (
    <section id="certifications" className="certifications-section">
      <AnimatedSection className="certifications">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          Certifications
        </motion.h2>
        <ul className="cert-list">
          <motion.li
            custom={0}
            initial="hidden"
            animate={controls}
            variants={listItemVariants}
          >
            Web Applications for Everybody Specialization, University of Michigan
          </motion.li>
          <motion.li
            custom={1}
            initial="hidden"
            animate={controls}
            variants={listItemVariants}
          >
            HTML, CSS, and JavaScript for Web Developers, Johns Hopkins University
          </motion.li>
          <motion.li
            custom={2}
            initial="hidden"
            animate={controls}
            variants={listItemVariants}
          >
            PET B1 Certificate, Cambridge Assessment English
          </motion.li>
        </ul>
      </AnimatedSection>
    </section>
  );
};

export default Certifications;
