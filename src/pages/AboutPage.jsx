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
      name: 'Malware Incident Response and Mitigation', 
      org: 'Forage', 
      year: '2024',
      id: 'SqqJgG6Ceaih3WYvq'
    },
    { 
      name: 'Linux Command Line Workshop', 
      org: 'FOSS-CIT', 
      year: '2024',
      id: 'None'
    },
    { 
      name: 'Network and Network Security', 
      org: 'Prompt Infotech', 
      year: '2024',
      id: 'PITE0208'
    },
    { 
      name: 'Cyber Security for Businesses', 
      org: 'EC-Council', 
      year: '2024',
      id: '369707'
    },
    { 
      name: 'Phishing Simulation Design & Analysis', 
      org: 'Forage', 
      year: '2024',
      id: 'SqqJgG6Ceaih3WYvq'
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
                I’m <span className="highlight-text">Parithikrishnan M</span>, a passionate student and aspiring cybersecurity professional based in Coimbatore, Tamil Nadu. 
                I serve as the Joint Secretary of <span className="highlight-text">FOSS-CIT</span>, actively contributing to open-source communities and exploring cutting-edge technologies.
              </p>
              <p>
                My interests span across <span className="highlight-text">cybersecurity, networking, communication, and decentralized technologies</span>. 
                I have a strong focus on FOSS technologies in Linux and Android, and I am constantly exploring new tools, frameworks, and methodologies across the tech landscape.
              </p>
              <p>
                I thrive on building and securing robust architectures, testing systems for vulnerabilities, and designing private and secure communication solutions. 
                With hands-on project experience, I am eager to learn, collaborate, and work alongside brilliant minds to create innovative and impactful solutions.
              </p>

              <div className="current-focus-section">
                <p className="current-focus-title">Current Focus:</p>
                <div className="focus-tags">
                  {['Decentralized Communication', 'Communication without internet', 'Cryptocurrency'].map((focus, i) => (
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
                  <h3 className="hackathon-name">CodeOClock</h3>
                  <span className="hackathon-badge winner">24Hr Hackathon</span>
                </div>
                <p className="hackathon-description">Built a Supply Chain Management tool on Blockchain Network</p>
                <div className="hackathon-tags">
                  <span className="hackathon-tag">Python</span>
                  <span className="hackathon-tag">React</span>
                </div>
              </div>

              <div className="hackathon-item">
                <div className="hackathon-header">
                  <h3 className="hackathon-name">DevSpark</h3>
                  <span className="hackathon-badge second-place">24Hr Hackathon</span>
                </div>
                <p className="hackathon-description">Ransomeware Detection and Prevention tool</p>
                <div className="hackathon-tags">
                  <span className="hackathon-tag">VM</span>
                  <span className="hackathon-tag">Python</span>
                </div>
              </div>

              <div className="hackathon-item">
                <div className="hackathon-header">
                  <h3 className="hackathon-name">Breach Point</h3>
                  <span className="hackathon-badge top-ten">CTF</span>
                </div>
                <p className="hackathon-description">I have lost more CTFs than I can count😂, but at least I’m rich with mistakes</p>
                <div className="hackathon-tags">
                  <span className="hackathon-tag">Forensics</span>
                  <span className="hackathon-tag">OSINT</span>
                </div>
              </div>
            </div>

            <div className="currently-learning-section">
              <h3 className="learning-title">📚 Currently Learning</h3>
              <div className="learning-topics">
                {['Crypto-economics', 'Crypto Market Trading (Baby)', 'Communication without internet', 'Blockchain'].map((topic, i) => (
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
            <h2 className="card-title gradient-text">Experience</h2>
            
            <div className="leadership-entries">
              <div className="leadership-card">
                <div className="leadership-header">
                  <div className="leadership-icon">
                    👑
                  </div>
                  <div>
                    <h3 className="leadership-title-item">Joint Secretary (FOSS-CIT)</h3>
                    <p className="leadership-duration">2025 - Present</p>
                  </div>
                </div>
                <p className="leadership-description">
                  Leading a vibrant community of open-source enthusiasts. Organizing 
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
                    <h3 className="leadership-title-item">Technical Team Member (FOSS-CIT)</h3>
                    <p className="leadership-duration">2024 - 2025</p>
                  </div>
                </div>
                <p className="leadership-description">
                 Organized Workshops on Docker and MongoDB. Contributing to Open Source Projects.
                </p>
                <div className="leadership-tags">
                  <span className="leadership-tag">Mentorship</span>
                  <span className="leadership-tag">Event Management</span>
                  <span className="leadership-tag">Project Workflows</span>
                </div>
              </div>

              <div className="leadership-card">
                <div className="leadership-header">
                  <div className="leadership-icon">
                    🎤
                  </div>
                  <div>
                    <h3 className="leadership-title-item">Tech Team (Part Time)</h3>
                    <p className="leadership-duration">06/2025 - 08/2025</p>
                  </div>
                </div>
                <p className="leadership-description">
                  Worked on projects including a Social Media Scraper, Billing Software, and Timesheets, gaining hands-on experience in web scraping, employee management, and billing system development
                </p>
                <div className="leadership-tags">
                  <span className="leadership-tag">Project Workflows</span>
                  <span className="leadership-tag">Project Management</span>
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
                  {['Python', 'JavaScript', 'Bash', 'C', 'C++'].map((skill, i) => (
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
                  {['React', 'Angular', 'Bootstrap', 'Tailwind CSS'].map((skill, i) => (
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
                  Backend and Databases
                </h3>
                <div className="skill-tags">
                  {['Node.js', 'Express', 'Django', 'REST APIs', 'Socket.io','MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'].map((skill, i) => (
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
                  Tools and Frameworks
                </h3>
                <div className="skill-tags">
                  {[ 'Wireshark','Nmap','NetCat','Burp Suite','Caido','Nikto','Sandboxing','OWASP Top 10'].map((skill, i) => (
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
                  {['Git', 'Docker', 'Github','GitLab'].map((skill, i) => (
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
                  Operating Systems
                </h3>
                <div className="skill-tags">
                  {['Linux (Arch and Debian based Distributions)', 'Windows (Client)'].map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;