import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import LaserFlow from '../animations/page/LaserFlow';
import TextType from '../animations/page/TextType';
import '../styles/LoadingPage.css';

function LoadingPage() {
  const navigate = useNavigate();
  const [typingComplete, setTypingComplete] = useState(false);
  const [redirectScheduled, setRedirectScheduled] = useState(false); // New state to prevent multiple redirects

  // This useEffect will handle the 10-second redirect
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      // Only navigate if a redirect hasn't been scheduled already by typing completion
      if (!redirectScheduled) {
        navigate('/home');
      }
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(redirectTimer);
  }, [navigate, redirectScheduled]); // Dependencies: navigate and redirectScheduled

  const handleTypingComplete = () => {
    setTypingComplete(true);
    // Mark that a redirect has been handled by typing completion
    setRedirectScheduled(true);
    // This timeout will still trigger, but the useEffect's timeout will be prevented from navigating
    setTimeout(() => {
      navigate('/home');
    }, 2000); // This redirect will happen 2 seconds after typing completes
  };

  return (
    <div className="laserflow-container">
      <div className="laser-effect-wrapper">
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          color="#4169E1"
        />
      </div>

      <div className={`center-box ${typingComplete ? 'loaded' : ''}`}>
        <div className="border-top"></div>
        <div className="border-right"></div>
        <div className="border-bottom"></div>
        <div className="border-left"></div>


        {!typingComplete && (
          <TextType
            text={[
              '',
              'Initiating encrypted handshake',
              'Portfolio incoming ..........',
            ]}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            onTypingComplete={handleTypingComplete}
          />
        )}
         {typingComplete && (
          <p>Redirecting...</p> 
        )}
      </div>
    </div>
  );
}

export default LoadingPage;