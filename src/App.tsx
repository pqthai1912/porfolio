// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
// import Contact from "./components/Contact";
import ContactMe from "./components/ContactMe";
import EnglishAbility from "./components/EnglishAbility";
// Footer now included in ContactMe
import { env } from "./utils/env";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const hasAppliedInitialHash = useRef(false);

  // Handle initial loading transition
  useEffect(() => {
    // Add a slight delay to ensure smooth initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle initial URL hash on page load.
  useEffect(() => {
    if (hasAppliedInitialHash.current) return;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    setCurrentSection(hash);
    hasAppliedInitialHash.current = true;

    // Delay until initial render completes so anchor scrolling lands correctly.
    const timer = window.setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, []);

  // Track visible sections during scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setCurrentSection(entry.target.id);
            // Update URL hash without scrolling
            const currentUrl = window.location.pathname + window.location.search;
            window.history.replaceState(null, "", `${currentUrl}#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 } // Element must be 30% visible
    );

    // Observe all section elements
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [isLoading]); // Run after initial loading.

  // Preload key images for smoother experience
  useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = [
        '/background.jpeg',
        '/avatar.jpg',
        '/sunset.jpg'
      ];
      
      imagesToPreload.forEach(imagePath => {
        const img = new Image();
        img.src = env.PUBLIC_URL + imagePath;
      });
    };
    
    preloadImages();
  }, []);

  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className={`app ${isLoading ? 'loading' : 'loaded'}`}>
      <Header currentSection={currentSection} />
      <AnimatePresence mode="wait">
        <motion.main 
          className="scroll-container" 
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Certifications />
          <EnglishAbility />
          <Education />
          {/* <Contact /> */}
          <ContactMe />
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default App;
