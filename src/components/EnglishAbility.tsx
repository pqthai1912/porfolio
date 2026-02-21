import React from "react";
import { motion } from "framer-motion";
import "./EnglishAbility.css";
import AnimatedSection from "./AnimatedSection";

const EnglishAbility: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="english-ability" className="english-ability-section">
      <AnimatedSection>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Languages
        </motion.h2>

        <div className="language-summary">
          <div className="language-card">
            <h3>English</h3>
            <p>PET B1 Certificate (Cambridge Assessment English)</p>
          </div>
          <div className="language-card">
            <h3>Japanese</h3>
            <p>Currently learning (N5)</p>
          </div>
        </div>
        
        <div className="certificate-container">
          <motion.div 
            className="certificate-header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="certificate-box result" variants={itemVariants}>
              <div className="value">Pass at Grade C</div>
            </motion.div>
            
            <motion.div className="certificate-box score" variants={itemVariants}>
              <div className="value">142</div>
            </motion.div>
            
            <motion.div className="certificate-box cefr" variants={itemVariants}>
              <div className="value">B1</div>
            </motion.div>
          </motion.div>
          
          <div className="certificate-details">
            <div className="cefr-column">
              <h3>Level</h3>
              <motion.div 
                className="level-box b2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >B2</motion.div>
              <motion.div 
                className="level-box b1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >B1</motion.div>
              <motion.div 
                className="level-box a2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >A2</motion.div>
            </div>
            
            <motion.div 
              className="skill-column"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h3>Reading</h3>
              <motion.div className="skill-score reading" variants={skillVariants}>
                <span>141</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="skill-column"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h3>Writing</h3>
              <motion.div className="skill-score writing" variants={skillVariants}>
                <span>155</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="skill-column"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h3>Listening</h3>
              <motion.div className="skill-score listening" variants={skillVariants}>
                <span>123</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="skill-column"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h3>Speaking</h3>
              <motion.div className="skill-score speaking" variants={skillVariants}>
                <span>150</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default EnglishAbility;
