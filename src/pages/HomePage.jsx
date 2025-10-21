import React, { useRef } from 'react';
import { Github, Linkedin, Mail } from "lucide-react";
import DarkVeil from '../animations/page/HomeBackground';
import ProfileCard from '../animations/page/ProfileCard';
import MagicBento from '../../components/MagicBento';
import useMobileDetection from '../../hooks/useMobileDetection';

import '../styles/HomePage.css';
import '../../components/MagicBento.css';

const DEFAULT_GLOW_COLOR = '132, 0, 255';
const DEFAULT_SPOTLIGHT_RADIUS = 300;

const GITHUB_URL = "https://github.com/Parithikrishnan";
const LINKEDIN_URL = "https://linkedin.com/in/Parithikrishnan";
const YOUR_EMAIL_ADDRESS = 'parithikrishnan.mahendran@outlook.com';
const YOUR_MAIL_SUBJECT = 'Inquiry';

const HeaderLinks = () => (
  <div className="header-links">
    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="icon-link">
      <Github size={35} color="var(--purple-primary)" />
    </a>
    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="icon-link">
      <Linkedin size={35} color="var(--purple-primary)" />
    </a>
    <a 
      href={`mailto:${YOUR_EMAIL_ADDRESS}?subject=${encodeURIComponent(YOUR_MAIL_SUBJECT)}`} 
      className="icon-link"
    >
      <Mail size={35} color="var(--purple-primary)" />
    </a>
  </div>
);

const FooterComponent = () => (
  <footer className="page-footer">
    <p>Built with 💜</p>
  </footer>
);


const HomePage = () => {
  const rightSidebarRef = useRef(null);
  const isMobile = useMobileDetection();

  const GLOW_COLOR = DEFAULT_GLOW_COLOR;
  const SPOTLIGHT_RADIUS = DEFAULT_SPOTLIGHT_RADIUS;

  const shouldDisableAnimations = isMobile;

  const handleCardClick = (title) => {
    console.log(`${title} box clicked!`);
  };

  return (
    <div className="homepage-container">
      <DarkVeil />

      <HeaderLinks />
      
      <div className="profile-card-wrapper">
        <ProfileCard
          name="Parithikrishnan"
          title="Cyber Security Enthusiast"
          status="Open to Work"
          contactText=""
          avatarUrl="/parithikrishnan.jpeg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log('Contact clicked')}
        />
      </div>

      <div className="right-sidebar-container" ref={rightSidebarRef}>
        <MagicBento
          disableAnimations={shouldDisableAnimations}
          enableTilt={!shouldDisableAnimations}
          enableMagnetism={!shouldDisableAnimations}
          clickEffect={!shouldDisableAnimations}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          spotlightRadius={SPOTLIGHT_RADIUS}
          glowColor={GLOW_COLOR}
          onCardClick={handleCardClick}
        />
      </div>
      
      <FooterComponent />
    </div>
  );
};

export default HomePage;