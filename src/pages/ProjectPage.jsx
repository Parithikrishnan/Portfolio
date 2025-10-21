import React from 'react';
import DarkVeil from '../animations/page/HomeBackground';
import FuzzyText from '../animations/page/FuzzyText';
import '../styles/ProjectPage.css'; 

const ProjectPage = () => {
  const hoverIntensity = 0.3;
  const enableHover = false;

  return (
    <div style={styles.wrapper}>
      <DarkVeil />
      <div style={styles.overlay}>
        <FuzzyText 
          baseIntensity={0.1}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
        >
          Under construction
        </FuzzyText>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    minHeight: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#000', // Fallback if DarkVeil doesn't load
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '3rem',
    textAlign: 'center',
    pointerEvents: 'none', // Ensures background interactions stay possible
  }
};

export default ProjectPage;
