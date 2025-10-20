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
          name="Parithikrishnan"
          title="Cyber Security Enthusiasts"
          status="Open to Work"
          contactText="Contact"
          avatarUrl="../../public/parithikrishnan.jpeg" 
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
