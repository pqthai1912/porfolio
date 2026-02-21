import React, { useState, useRef, useEffect } from "react";
import "./ContactMe.css";
import emailjs from '@emailjs/browser';
import { env } from "../utils/env";
import Footer from "./Footer";
import { motion } from "framer-motion";

const ContactMe: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean; message: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // EmailJS configuration - Use environment variables
    const serviceID = env.REACT_APP_EMAILJS_SERVICE_ID || 'service_0646n23';
    const templateID = env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_33c7bmi';
    const publicKey = env.REACT_APP_EMAILJS_PUBLIC_KEY || 'cakhKgnNktBaN0-ZN';
    
    if (formRef.current) {
      emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
        .then((result) => {
          console.log('Email sent successfully:', result.text);
          setSubmitStatus({
            success: true,
            message: "Thanks for reaching out! I'll get back to you soon."
          });
          // Reset form
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
          });
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          setSubmitStatus({
            success: false,
            message: "Failed to send message. Please try again later."
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (submitStatus?.success) {
      timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitStatus]);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-headline">
          <h6>Get in Touch</h6>
          <h2>Let's Work Together</h2>
          <p className="tagline">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-method">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-info-content">
                <h4>Email</h4>
                <a href="mailto:thaiphan1912@gmail.com">thaiphan1912@gmail.com</a>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.64 2.64a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.44-1.3a2 2 0 0 1 2.11-.45c.85.31 1.74.52 2.64.64A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-info-content">
                <h4>Phone</h4>
                <a href="tel:0763666147">0763 666 147</a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
              <div className="contact-info-content">
                <h4>GitHub</h4>
                <a href="https://github.com/pqthai1912" target="_blank" rel="noopener noreferrer">github.com/pqthai1912</a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div className="contact-info-content">
                <h4>LinkedIn</h4>
                <a href="https://linkedin.com/in/pqthai1912" target="_blank" rel="noopener noreferrer">linkedin.com/in/pqthai1912</a>
              </div>
            </div>
          </div>
          
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            <form 
              className="contact-form" 
              ref={formRef} 
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              {submitStatus && (
                <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
                  {submitStatus.success ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  )}
                  {submitStatus.message}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <div className="footer-wrapper safe-area-bottom">
        <Footer />
      </div>
    </section>
  );
};

export default ContactMe;
