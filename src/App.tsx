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
// Footer now included in ContactMe
import { env } from "./utils/env";
import "./App.css";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle initial loading transition
  useEffect(() => {
    // Add a slight delay to ensure smooth initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle initial URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Slight delay to ensure components are mounted
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          // Use scrollIntoView for consistency with navigation
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Longer delay to ensure proper rendering
    }
  }, []);

  // Cải thiện xử lý sự kiện touch cho thiết bị di động
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // Xử lý touchmove để đảm bảo nội dung có thể cuộn
      const handleTouchMove = (e: TouchEvent) => {
        // Chỉ ngăn chặn sự kiện mặc định nếu cần thiết
        if (container.scrollHeight <= container.clientHeight) {
          e.preventDefault();
        }
      };
      
      // Xử lý wheel để ngăn chặn các hiệu ứng cuộn mặc định gây xung đột
      const handleWheel = (e: WheelEvent) => {
        // Tùy chỉnh hành vi cuộn nếu cần
        if (Math.abs(e.deltaY) > 0) {
          container.scrollTop += e.deltaY;
        }
      };
      
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

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

  return (
    <div className={`app ${isLoading ? 'loading' : 'loaded'}`}>
      <Header />
      <main className="scroll-container" ref={scrollContainerRef}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Education />
        {/* <Contact /> */}
        <ContactMe />
      </main>
    </div>
  );
};

export default App;
