import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(false);
  const [pageName, setPageName] = useState('');
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Reset states for new route
    let name = 'PharmoCare';
    if (location.pathname.includes('privacy')) name = 'Privacy Policy';
    else if (location.pathname.includes('terms')) name = 'Terms & Conditions';
    else if (location.pathname === '/') name = 'PharmoCare';

    setPageName(name);
    setLoading(true);
    setProgress(0);

    // Number loading animation
    const duration = 1200; // total loading time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 200); // small delay after 100% before transition
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <>
      <div className={`page-loader-wrapper ${loading ? 'active' : 'finished'}`}>
        {/* A solid background to prevent 'cuts' from showing initially */}
        <div className="loader-solid-bg"></div>

        {/* 5 horizontal rows for the pieces transition */}
        <div className="loader-row row-1"></div>
        <div className="loader-row row-2"></div>
        <div className="loader-row row-3"></div>
        <div className="loader-row row-4"></div>
        <div className="loader-row row-5"></div>

        {/* Text and Progress Overlay */}
        <div className="loader-overlay">
          <div className="loader-text-container">
            <h1 className="loader-title">{pageName}</h1>
          </div>
          <div className="loader-percentage-corner">{progress}%</div>
          <div className="loader-progress-bar-container">
            <div className="loader-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      
      {/* Hide scrollbar/interaction while loading */}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease', pointerEvents: loading ? 'none' : 'auto' }}>
        {children}
      </div>
    </>
  );
}
