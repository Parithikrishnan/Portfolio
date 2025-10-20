import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Download, Mail, User, MessageSquare, Send } from "lucide-react";

const DEFAULT_PARTICLE_COUNT = 25;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';

const cardData = [
  {
    id: "hero",
    title: "Parithikrishnan",
    subtitle: "Aspiring Technologist",
    description: "Passionate about exploring and learning every aspect of technology, continuously experimenting, building skills, and staying curious.",
    isHero: true
  },
  {
    id: "projects",
    title: "View Projects",
    description: "Explore my latest work",
    link: "/projects",
  },
  {
    id: "about",
    title: "About Me",
    description: "My journey",
    link: "/about-me",
  },
  {
    id: "contact",
    title: "Contact Info",
    description: "Get in touch",
    isContact: true,
  },
  {
    id: "resume",
    title: "Download Resume",
    description: "View my complete CV",
    isDownload: true,
    downloadPath: "../public/logo.jpeg"
  },
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 10px rgba(${color}, 0.8), 0 0 20px rgba(${color}, 0.4);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard = ({ children, cardRef, glowColor = DEFAULT_GLOW_COLOR, particleCount = DEFAULT_PARTICLE_COUNT }) => {
  const particlesRef = useRef([]);
  const animationFrameIdsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticleTemplates = useRef([]);

  const initializeParticleTemplates = useCallback(() => {
    if (memoizedParticleTemplates.current.length > 0 || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticleTemplates.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
  }, [particleCount, glowColor, cardRef]);

  const clearAllParticles = useCallback(() => {
    animationFrameIdsRef.current.forEach(cancelAnimationFrame);
    animationFrameIdsRef.current = [];
    particlesRef.current.forEach(particle => {
      particle.style.transition = 'all 0.3s ease';
      particle.style.transform = 'scale(0)';
      particle.style.opacity = '0';
      setTimeout(() => particle.remove(), 300);
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    initializeParticleTemplates(); // Ensure templates are initialized on hover

    memoizedParticleTemplates.current.forEach((template, index) => {
      const delay = index * 50; // Staggered appearance

      setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = template.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        clone.style.transform = 'scale(0)';
        clone.style.opacity = '0';
        
        requestAnimationFrame(() => {
          clone.style.transition = 'all 0.3s ease';
          clone.style.transform = 'scale(1)';
          clone.style.opacity = '1';
        });

        const start = Date.now();
        const duration = 1500 + Math.random() * 1500; // Randomize duration

        const moveParticle = () => {
          if (!isHoveredRef.current || !cardRef.current) {
            clone.remove();
            return;
          }

          const elapsed = Date.now() - start;
          const progress = elapsed / duration;

          if (progress < 1) {
            const x = (Math.sin(progress * Math.PI * 2) * 75) + (Math.random() - 0.5) * 50; // More controlled movement
            const y = (Math.cos(progress * Math.PI * 2) * 75) + (Math.random() - 0.5) * 50;
            const rotation = progress * 360;
            clone.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${0.8 + Math.random() * 0.4})`;
            animationFrameIdsRef.current.push(requestAnimationFrame(moveParticle));
          } else {
            // Restart animation after duration
            clone.style.transition = 'all 0.3s ease';
            clone.style.transform = 'scale(0)';
            clone.style.opacity = '0';
            setTimeout(() => {
              if (isHoveredRef.current && cardRef.current) {
                // Reset position for a new animation cycle
                const { width, height } = cardRef.current.getBoundingClientRect();
                clone.style.left = `${Math.random() * width}px`;
                clone.style.top = `${Math.random() * height}px`;
                requestAnimationFrame(() => {
                  clone.style.transition = 'none'; // Remove transition for instant repositioning
                  clone.style.transform = 'scale(0)'; // Ensure it's hidden before new cycle
                  clone.style.opacity = '0';
                  setTimeout(() => { // Small delay to apply new position before starting new animation
                    startAnimationCycle(clone);
                  }, 10);
                });
              } else {
                clone.remove();
              }
            }, 300); // Wait for fade out
          }
        };

        const startAnimationCycle = (p) => {
          const cycleStart = Date.now();
          const cycleDuration = 1500 + Math.random() * 1500;

          const animateCycle = () => {
            if (!isHoveredRef.current || !cardRef.current) {
              p.remove();
              return;
            }

            const cycleElapsed = Date.now() - cycleStart;
            const cycleProgress = cycleElapsed / cycleDuration;

            if (cycleProgress < 1) {
              const x = (Math.sin(cycleProgress * Math.PI * 2) * 75) + (Math.random() - 0.5) * 50;
              const y = (Math.cos(cycleProgress * Math.PI * 2) * 75) + (Math.random() - 0.5) * 50;
              const rotation = cycleProgress * 360;
              p.style.transition = 'all 1.5s linear'; // Smooth transition for movement
              p.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${0.8 + Math.random() * 0.4})`;
              animationFrameIdsRef.current.push(requestAnimationFrame(animateCycle));
            } else {
              // Once a cycle finishes, immediately start a new one (or fade out if not hovered)
              if (isHoveredRef.current) {
                startAnimationCycle(p); // Restart the cycle
              } else {
                p.style.transition = 'all 0.3s ease';
                p.style.transform = 'scale(0)';
                p.style.opacity = '0';
                setTimeout(() => p.remove(), 300);
              }
            }
          };
          
          p.style.transition = 'all 0.3s ease'; // Transition for scale/opacity
          p.style.transform = 'scale(1)';
          p.style.opacity = '1';
          animationFrameIdsRef.current.push(requestAnimationFrame(animateCycle));
        };

        startAnimationCycle(clone); // Start the first animation cycle
      }, delay);
    });
  }, [initializeParticleTemplates, cardRef]);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, cardRef]);

  return children;
};

export default function MagicBentoPortfolio() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const gridRef = useRef(null);
  const cardRefs = useRef({}); // Initialize cardRefs as an empty object

  useEffect(() => {
    if (!gridRef.current) return;

    const handleMouseMove = (e) => {
      const section = gridRef.current;
      const rect = section.getBoundingClientRect();
      const mouseInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                         e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = section.querySelectorAll('.card');
      
      if (!mouseInside) {
        cards.forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS;
      const proximity = spotlightRadius * 0.5;
      const fadeDistance = spotlightRadius * 0.75;

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - 
                        Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        card.style.setProperty('--glow-x', `${relativeX}%`);
        card.style.setProperty('--glow-y', `${relativeY}%`);
        card.style.setProperty('--glow-intensity', glowIntensity.toString());
        card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCardClick = (card) => {
  if (card.isDownload && card.downloadPath) {
    const link = document.createElement('a');
    link.href = card.downloadPath;
    link.setAttribute('download', 'Parithikrishnan_resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (card.isContact) {
    setShowContactForm(true);
  } else if (card.link) {
    window.location.href = card.link;
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! (This is a placeholder - connect to your backend)');
    setShowContactForm(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <style>{`
        :root {
          --purple-primary: rgba(132, 0, 255, 1);
          --purple-glow: rgba(132, 0, 255, 0.2);
          --border-color: #392e4e;
          --background-dark: #060010;
          --white: hsl(0, 0%, 100%);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #1a0033 0%, #000000 100%);
          min-height: 90vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
          font-size: 12px;
        }

        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px;
          position: relative;
        }

        .container::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -100%;
          width: 10%;
          height: 200%;
          background: radial-gradient(circle at 30% 20%, rgba(132, 0, 255, 0.3) 0%, transparent 100%);
          pointer-events: none;
          animation: glow 8s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto auto auto;
          gap: 1em;
          padding: 1em;
          max-width: 1200px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          min-height: 20px;
          padding: 2em;
          border-radius: 24px;
          border: 2px solid var(--border-color);
          background: var(--background-dark);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(132, 0, 255, 0.3);
        }

        .card--hero {
          grid-column: 1 / -1;
          min-height: 200px;
          text-align: center;
          justify-content: center;
          align-items: center;
        }

        /* Specific grid placements for other cards */
        .card--projects {
          grid-column: span 1;
          grid-row: span 1;
        }
        
        .card--about {
          grid-column: span 2;
          grid-row: span 2;
          min-height: 400px;
        }
        
        .card--contact {
          grid-column: span 1;
          grid-row: span 1;
        }
        
        .card--resume {
          grid-column: span 1;
          grid-row: span 1;
        }

        .card__content {
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
          color: var(--white);
        }

        .card__title {
          font-weight: 600;
          font-size: 0.8em;
          margin: 0 0 0.3em 0;
          color: var(--white);
        }

        .card--hero .card__title {
          font-size: 1em;
          background: linear-gradient(135deg, #fff 0%, #b8c5ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card__subtitle {
          font-size: 1em;
          color: #b8c5ff;
          margin-bottom: 0.5em;
        }

        .card__description {
          font-size: 1em;
          line-height: 1.6;
          opacity: 0.85;
          color: #d8e0ff;
        }

        .card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 50px;
          margin: 0 auto 1em;
          border-radius: 20px;
          background: rgba(132, 0, 255, 0.15);
          border: 2px solid rgba(132, 0, 255, 0.3);
          transition: all 0.3s ease;
        }

        .card:hover .card__icon {
          background: rgba(132, 0, 255, 0.25);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 25px rgba(132, 0, 255, 0.4);
        }

        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 8px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(132, 0, 255, calc(var(--glow-intensity) * 1.2)) 0%,
            rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 25%,
            rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 50%,
            transparent 70%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        .card--border-glow:hover {
          box-shadow: 0 10px 50px rgba(132, 0, 300, 0.59), 0 0 50px var(--purple-glow);
        }

        .particle {
          will-change: transform, opacity;
          filter: blur(1px);
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal {
          background: linear-gradient(135deg, rgba(30, 25, 60, 0.98) 0%, rgba(20, 15, 45, 0.98) 100%);
          color: #d8e0ff;
          border: 2px solid rgba(132, 0, 255, 0.5);
          border-radius: 24px;
          padding: 40px;
          width: min(90%, 600px);
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(132, 0, 255, 0.5);
          position: relative;
          animation: modalSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes modalSlideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(132, 0, 255, 0.2);
          border: 1px solid rgba(132, 0, 255, 0.4);
          border-radius: 12px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b8c5ff;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(132, 0, 255, 0.4);
          color: #fff;
          transform: rotate(90deg);
        }

        .modal h2 {
          margin-bottom: 30px;
          color: #fff;
          font-weight: 600;
          font-size: 2.2rem;
          text-align: center;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          color: #b8c5ff;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          background: rgba(132, 0, 255, 0.1);
          border: 2px solid rgba(132, 0, 255, 0.3);
          border-radius: 12px;
          padding: 14px 18px;
          color: #fff;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(132, 0, 255, 0.6);
          background: rgba(132, 0, 255, 0.15);
          box-shadow: 0 0 20px rgba(132, 0, 255, 0.2);
        }

        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, rgba(132, 0, 255, 0.8) 0%, rgba(100, 0, 200, 0.8) 100%);
          border: 2px solid rgba(132, 0, 255, 0.5);
          border-radius: 12px;
          padding: 16px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, rgba(132, 0, 255, 1) 0%, rgba(100, 0, 200, 1) 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(132, 0, 255, 0.4);
        }

        .contact-details {
          margin-top: 30px;
          padding: 25px;
          background: rgba(132, 0, 255, 0.05);
          border: 1px solid rgba(132, 0, 255, 0.2);
          border-radius: 16px;
        }

        .contact-details h3 {
          color: #fff;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }

        .contact-details p {
          color: #b8c5ff;
          line-height: 1.8;
          margin: 8px 0;
        }

        @media (max-width: 1024px) {
          .card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .card--hero {
            grid-column: 1 / -1;
          }
          
          .card--about {
            grid-column: 1 / -1;
            grid-row: span 1;
            min-height: 300px;
          }
          
          .card--projects,
          .card--contact,
          .card--resume {
            grid-column: span 1;
          }
        }

        @media (max-width: 640px) {
          .card-grid {
            grid-template-columns: 1fr;
            gap: 0.8em;
          }
          
          .card {
            min-height: 200px;
            padding: 1.5em;
          }
          
          .card--hero .card__title {
            font-size: 2em;
          }
          
          .card__title {
            font-size: 1.5em;
          }
          
          .card__icon {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>

      <div className="container">
        <div className="card-grid" ref={gridRef}>
          {cardData.map((card) => {
            const cardRef = useRef(null);
            cardRefs.current[card.id] = cardRef;

            return (
              <ParticleCard key={card.id} cardRef={cardRef} glowColor={DEFAULT_GLOW_COLOR}>
                <div
                  ref={cardRef}
                  className={`card card--border-glow card--${card.id}`}
                  onClick={() => !card.isHero && handleCardClick(card)}
                  style={{ cursor: card.isHero ? 'default' : 'pointer' }}
                >
                  <div className="card__content">
                    {card.isHero ? (
                      <>
                        <h1 className="card__title">{card.title}</h1>
                        <div className="card__subtitle">{card.subtitle}</div>
                        <p className="card__description">{card.description}</p>
                      </>
                    ) : (
                      <>
                        <div className="card__icon">
                          {card.isDownload && <Download size={40} color="#b8c5ff" />}
                          {card.isContact && <Mail size={40} color="#b8c5ff" />}
                          {card.id === 'projects' && <MessageSquare size={40} color="#b8c5ff" />}
                          {card.id === 'about' && <User size={40} color="#b8c5ff" />}
                        </div>
                        <h2 className="card__title">{card.title}</h2>
                        <p className="card__description">{card.description}</p>
                      </>
                    )}
                  </div>
                </div>
              </ParticleCard>
            );
          })}

          {showContactForm && (
            <div className="modal-overlay" onClick={() => setShowContactForm(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setShowContactForm(false)}>
                  <X size={24} />
                </button>
                <h2>Get In Touch</h2>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    <Send size={20} />
                    Send Message
                  </button>
                </form>

                <div className="contact-details">
                  <h3>Contact Details</h3>
                  <p>📧 Email: your.email@example.com</p>
                  <p>📱 Phone: +91 98765 43210</p>
                  <p>📍 Location: Your City, Country</p>
                  <p>🔗 LinkedIn: linkedin.com/in/yourprofile</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}