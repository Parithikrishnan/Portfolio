import React from 'react';
import FuzzyText from '../animations/page/FuzzyText'; // adjust path if needed

const NotFound = () => {
  const hoverIntensity = 0.5;
  const enableHover = true;

  return (
    <div style={styles.wrapper}>
      <FuzzyText 
        baseIntensity={0.2} 
        hoverIntensity={hoverIntensity} 
        enableHover={enableHover}
      >
        404 
      </FuzzyText>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '3rem',
    flexDirection: 'column',
  }
};

export default NotFound;
