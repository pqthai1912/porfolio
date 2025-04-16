// src/App.tsx
import React from "react";
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
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="scroll-container">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Education />
        {/* <Contact /> */}
        <ContactMe />
      </div>
      <Footer />
    </div>
  );
};
export default App;
