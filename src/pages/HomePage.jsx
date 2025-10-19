import React from 'react';
import DarkVeil from '../animations/page/HomeBackground';
import ProfileCard from '../animations/page/ProfileCard'; // assuming it's a default export
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <DarkVeil />

      <div className="profile-card-wrapper">
        <ProfileCard
          name="Parithikrishnan M"
          title="Cyber Security Enthusiasts"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/mnt/data/programming/src/assets/parithikrishnan.jpeg" 
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log('Contact clicked')}
        />
      </div>
    </div>
  );
};

export default HomePage;
