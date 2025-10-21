import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/AboutPage.css'; 


const AnimatedCertCard = ({ certification, animationClass }) => {
  return (
    <div className={`animated-cert-card ${animationClass}`}>
      <div className="cert-card-content">
        <div className="cert-card-header">
          <div className="cert-card-icon">
            🏅
          </div>
          <span className="cert-card-year">
            {certification.year}
          </span>
        </div>
        <div>
          <h3 className="cert-card-name">
            {certification.name}
          </h3>
          <p className="cert-card-org">
            {certification.org}
          </p>
          <p className="cert-card-id">
            ID: {certification.id}
          </p>
        </div>
      </div>
    </div>
  );
};


const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [certIndex, setCertIndex] = useState(0);
  const [certAnimationDirection, setCertAnimationDirection] = useState('next'); // 'next' or 'prev'
  const [currentCertAnimationClass, setCurrentCertAnimationClass] = useState('');
  const certAnimationTimeoutRef = useRef(null);
  const autoSlideIntervalRef = useRef(null);

  const certifications = [
    { 
      name: 'AWS Certified Solutions Architect', 
      org: 'Amazon Web Services', 
      year: '2024',
      id: 'AWS-SA-2024'
    },
    { 
      name: 'Google Cloud Professional Developer', 
      org: 'Google Cloud Platform', 
      year: '2024',
      id: 'GCP-PD-2024'
    },
    { 
      name: 'React Advanced Certification', 
      org: 'Meta Blueprint', 
      year: '2023',
      id: 'META-RA-2023'
    },
    { 
      name: 'Kubernetes Administrator (CKA)', 
      org: 'Cloud Native Computing Foundation', 
      year: '2023',
      id: 'CNCF-CKA-2023'
    },
    { 
      name: 'Python Data Science Professional', 
      org: 'IBM', 
      year: '2023',
      id: 'IBM-DS-2023'
    }
  ];

  const startAutoSlide = useCallback(() => {
    clearInterval(autoSlideIntervalRef.current); // Clear any existing interval
    autoSlideIntervalRef.current = setInterval(() => {
      setCertAnimationDirection('next');
      setCurrentCertAnimationClass('slide-out-left');
      certAnimationTimeoutRef.current = setTimeout(() => {
        setCertIndex((prev) => (prev + 1) % certifications.length);
        setCurrentCertAnimationClass('slide-in-right');
      }, 500); // Duration of slide-out animation
    }, 4000); // Interval for auto-slide
  }, [certifications.length]);

  // Mouse move effect for background elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Auto-slide certifications
  useEffect(() => {
    startAutoSlide(); // Start on mount

    return () => {
      clearInterval(autoSlideIntervalRef.current);
      clearTimeout(certAnimationTimeoutRef.current);
    };
  }, [startAutoSlide]); // Re-run if certifications change length or startAutoSlide changes

  // Manually handle certification navigation
  const navigateCert = useCallback((direction) => {
    clearInterval(autoSlideIntervalRef.current); // Stop auto-slide on manual interaction
    clearTimeout(certAnimationTimeoutRef.current);

    setCertAnimationDirection(direction);
    setCurrentCertAnimationClass(direction === 'next' ? 'slide-out-left' : 'slide-out-right');

    certAnimationTimeoutRef.current = setTimeout(() => {
      setCertIndex((prev) => {
        const newIndex = direction === 'next' 
          ? (prev + 1) % certifications.length
          : (prev - 1 + certifications.length) % certifications.length;
        return newIndex;
      });
      setCurrentCertAnimationClass(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
      
      // Restart auto-slide after a delay
      autoSlideIntervalRef.current = setTimeout(() => {
        startAutoSlide();
      }, 3000); // Give some time before auto-slide resumes
    }, 500); // Match animation duration
  }, [certifications.length, startAutoSlide]);

  const handleCertDotClick = useCallback((index) => {
    clearInterval(autoSlideIntervalRef.current); // Stop auto-slide on manual interaction
    clearTimeout(certAnimationTimeoutRef.current);

    if (index === certIndex) return; // No change needed

    const direction = index > certIndex ? 'next' : 'prev';
    setCertAnimationDirection(direction);
    setCurrentCertAnimationClass(direction === 'next' ? 'slide-out-left' : 'slide-out-right');

    certAnimationTimeoutRef.current = setTimeout(() => {
      setCertIndex(index);
      setCurrentCertAnimationClass(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
      
      // Restart auto-slide after a delay
      autoSlideIntervalRef.current = setTimeout(() => {
        startAutoSlide();
      }, 3000); // Give some time before auto-slide resumes
    }, 500); // Match animation duration
  }, [certIndex, certifications.length, startAutoSlide]);

  const currentCertification = certifications[certIndex];

  return (
    <div className="about-page-container">
      {/* Dynamic Background Effects */}
      <div 
        className="background-gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.5), transparent 50%)`
        }}
      />

      {/* Floating Orbs */}
      <div 
        className="orb-one"
        style={{
          left: mousePosition.x * 0.03 - 192,
          top: mousePosition.y * 0.03 - 192,
        }}
      />
      <div 
        className="orb-two"
        style={{
          right: (1920 - mousePosition.x) * 0.02 - 160,
          bottom: (1080 - mousePosition.y) * 0.02 - 160,
        }}
      />

      <div className="content-wrapper">
        {/* Header */}
        <div className="header-section animate-in">
          <h1 className="main-title gradient-text">
            About Me
          </h1>
          <div className="divider-line" />
        </div>

        {/* Bento Grid Layout - Exactly like the image */}
        <div className="bento-grid">
          
          {/* Row 1 */}
          {/* About Me - Large Left Card */}
          <div 
            className="about-me-card glass-card animate-in"
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="card-title gradient-text">About Me</h2>
            <div className="about-me-content">
              <p>
                I'm a passionate full-stack developer and designer based in <span className="highlight-text">Tiruppur, Tamil Nadu</span>. 
                I specialize in creating stunning web experiences that combine cutting-edge technology with beautiful design.
              </p>
              <p>
                My expertise spans across modern web frameworks, cloud technologies, and UI/UX design. 
                I believe in writing clean, maintainable code and creating interfaces that users love.
              </p>
              <p>
                With a strong foundation in both frontend and backend development, I architect scalable 
                solutions that solve real-world problems. I'm constantly learning and adapting to new 
                technologies in this ever-evolving field.
              </p>
              <div className="current-focus-section">
                <p className="current-focus-title">Current Focus:</p>
                <div className="focus-tags">
                  {['React', 'Next.js', 'Cloud Architecture', 'AI/ML'].map((focus, i) => (
                    <span 
                      key={i}
                      className="focus-tag"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hackathons & Learning - Medium Center Card */}
          <div 
            className="hackathons-card glass-card animate-in"
            style={{ animationDelay: '0.2s' }}
          >
            <h2 className="card-title gradient-text">Hackathons & Learning</h2>
            
            <div className="hackathon-entries">
              <div className="hackathon-item">
                <div className="hackathon-header">
                  <h3 className="hackathon-name">ETHGlobal Hackathon 2024</h3>
                  <span className="hackathon-badge winner">Winner 🏆</span>
                </div>
                <p className="hackathon-description">Built a DeFi Dashboard with real-time analytics</p>
                <div className="hackathon-tags">
                  <span className="hackathon-tag">Web3</span>
                  <span className="hackathon-tag">React</span>
                </div>
              </div>

              <div className="hackathon-item">
                <div className="hackathon-header">
                  <h3 className="hackathon-name">Google Cloud Hackathon</h3>
                  <span className="hackathon-badge second-place">2nd Place 🥈</span>
                </div>
                <p className="hackathon-description">AI-powered voice assistant for accessibility</p>
                <div className="hackathon-tags">
                  <span className="hackathon-tag">ML</span>
                  <span className="hackathon-tag">Cloud</span>
                </div>
              </div>

              <div className="hackathon-item">
                <div className="hackathon-header">
                  <h3 className="hackathon-name">MLH Fellowship 2023</h3>
                  <span className="hackathon-badge top-ten">Top 10 ⭐</span>
                </div>
                <p className="hackathon-description">Health tracking app with ML predictions</p>
                <div className="hackathon-tags">
                  <span className="hackathon-tag">Mobile</span>
                  <span className="hackathon-tag">AI</span>
                </div>
              </div>
            </div>

            <div className="currently-learning-section">
              <h3 className="learning-title">📚 Currently Learning</h3>
              <div className="learning-topics">
                {['Rust', 'System Design', 'GraphQL', 'Blockchain', 'Microservices'].map((topic, i) => (
                  <span 
                    key={i}
                    className="learning-topic-tag"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info - Small Top Right */}
          <div 
            className="contact-card glass-card animate-in group"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="contact-icon">
              📧
            </div>
            <h3 className="contact-title">Contact Me</h3>
            <p className="contact-email">hello@portfolio.dev</p>
            <p className="contact-phone">+91 98765 43210</p>
            <div className="social-links">
              <div className="social-icon">
                <span>💼</span>
              </div>
              <div className="social-icon">
                <span>🐙</span>
              </div>
              <div className="social-icon">
                <span>🔗</span>
              </div>
            </div>
          </div>

          {/* Row 2 - Certifications */}
          <div 
            className="certifications-card glass-card animate-in"
            style={{ animationDelay: '0.4s' }}
          >
            <h2 className="certifications-title gradient-text">🎓 Certifications</h2>
            
            <div className="cert-carousel-wrapper"> {/* Changed from h-48 to a wrapper with relative positioning */}
              {/* Manual navigation buttons */}
              <button 
                onClick={() => navigateCert('prev')} 
                className="cert-nav-button left"
                aria-label="Previous certification"
              >
                &larr;
              </button>

              <AnimatedCertCard
                key={currentCertification.id} // Key ensures remounting for transitions
                certification={currentCertification}
                animationClass={currentCertAnimationClass}
              />

              <button 
                onClick={() => navigateCert('next')} 
                className="cert-nav-button right"
                aria-label="Next certification"
              >
                &rarr;
              </button>
            </div>

            <div className="cert-dots-container">
              {certifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleCertDotClick(i)}
                  className={`cert-dot ${i === certIndex ? 'active' : ''}`}
                  aria-label={`Go to certification ${i + 1}`}
                />
              ))}
            </div>

            <div className="cert-counter">
              <p>
                {certIndex + 1} / {certifications.length}
              </p>
            </div>
          </div>

          {/* Row 3 */}
          {/* FOSS Club & Leadership */}
          <div 
            className="foss-leadership-card glass-card animate-in"
            style={{ animationDelay: '0.5s' }}
          >
            <h2 className="card-title gradient-text">FOSS Club & Leadership</h2>
            
            <div className="leadership-entries">
              <div className="leadership-card">
                <div className="leadership-header">
                  <div className="leadership-icon">
                    👑
                  </div>
                  <div>
                    <h3 className="leadership-title-item">FOSS Club President</h3>
                    <p className="leadership-duration">2023 - Present</p>
                  </div>
                </div>
                <p className="leadership-description">
                  Leading a vibrant community of 200+ open-source enthusiasts. Organizing 
                  workshops, hackathons, and contributing to major FOSS projects.
                </p>
                <div className="leadership-tags">
                  <span className="leadership-tag">Community Building</span>
                  <span className="leadership-tag">Event Management</span>
                  <span className="leadership-tag">Mentorship</span>
                </div>
              </div>

              <div className="leadership-card">
                <div className="leadership-header">
                  <div className="leadership-icon">
                    💻
                  </div>
                  <div>
                    <h3 className="leadership-title-item">Tech Lead</h3>
                    <p className="leadership-duration">Various Projects</p>
                  </div>
                </div>
                <p className="leadership-description">
                  Architecting scalable solutions, mentoring junior developers, and leading 
                  technical decisions for multiple college and freelance projects.
                </p>
                <div className="leadership-tags">
                  <span className="leadership-tag">Architecture</span>
                  <span className="leadership-tag">Code Review</span>
                  <span className="leadership-tag">Team Leadership</span>
                </div>
              </div>

              <div className="leadership-card">
                <div className="leadership-header">
                  <div className="leadership-icon">
                    🎤
                  </div>
                  <div>
                    <h3 className="leadership-title-item">Speaker & Mentor</h3>
                    <p className="leadership-duration">Tech Conferences</p>
                  </div>
                </div>
                <p className="leadership-description">
                  Regular speaker at tech meetups and conferences. Mentoring aspiring developers 
                  and sharing knowledge on modern web development practices.
                </p>
                <div className="leadership-tags">
                  <span className="leadership-tag">Public Speaking</span>
                  <span className="leadership-tag">Teaching</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Tools - MASSIVE Priority Section */}
          <div 
            className="skills-tools-card glass-card animate-in"
            style={{ animationDelay: '0.6s' }}
          >
            <h2 className="skills-tools-title gradient-text">💼 Skills & Tools</h2>
            
            <div className="skills-grid">
              {/* Languages */}
              <div className="skill-category">
                <h3 className="skill-category-title">
                  <span className="skill-category-dot"></span>
                  Languages
                </h3>
                <div className="skill-tags">
                  {['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust'].map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frontend */}
              <div className="skill-category">
                <h3 className="skill-category-title">
                  <span className="skill-category-dot"></span>
                  Frontend
                </h3>
                <div className="skill-tags">
                  {['React', 'Next.js', 'Vue.js', 'Svelte', 'Tailwind CSS', 'Three.js', 'GSAP', 'Redux'].map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="skill-category">
                <h3 className="skill-category-title">
                  <span className="skill-category-dot"></span>
                  Backend
                </h3>
                <div className="skill-tags">
                  {['Node.js', 'Express', 'Django', 'FastAPI', 'GraphQL', 'REST APIs', 'Socket.io'].map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div className="skill-category">
                <h3 className="skill-category-title">
                  <span className="skill-category-dot"></span>
                  Databases
                </h3>
                <div className="skill-tags">
                  {['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase'].map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* DevOps & Tools */}
              <div className="skill-category">
                <h3 className="skill-category-title">
                  <span className="skill-category-dot"></span>
                  DevOps & Tools
                </h3>
                <div className="skill-tags">
                  {['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins', 'Terraform'].map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Design & Creative */}
              <div className="skill-category">
                <h3 className="skill-category-title">
                  <span className="skill-category-dot"></span>
                  Design & Creative
                </h3>
                <div className="skill-tags">
                  {['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Blender', 'After Effects'].map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Proficiency Levels */}
            <div className="proficiency-levels-section">
              <h3 className="proficiency-title">📊 Proficiency Levels</h3>
              <div className="proficiency-grid">
                {[
                  { level: 'Expert', color: 'from-purple-600 to-purple-400', width: '95%', skills: 'React, Node.js, JavaScript, TypeScript' },
                  { level: 'Advanced', color: 'from-purple-500 to-purple-300', width: '85%', skills: 'Python, AWS, Docker, GraphQL' },
                  { level: 'Intermediate', color: 'from-purple-400 to-purple-200', width: '70%', skills: 'Go, Kubernetes, Machine Learning' }
                ].map((item, i) => (
                  <div key={i} className="proficiency-item group">
                    <div className="proficiency-header">
                      <span className="proficiency-level">{item.level}</span>
                      <span className="proficiency-percentage">{item.width}</span>
                    </div>
                    <div className="proficiency-bar-background">
                      <div 
                        className={`proficiency-bar bg-gradient-to-r ${item.color}`}
                        style={{ width: item.width }}
                      />
                    </div>
                    <p className="proficiency-skills">{item.skills}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;