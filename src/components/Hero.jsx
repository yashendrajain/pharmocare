import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* Abstract Background Mesh/Glow elements */}
      <div className="hero-mesh-bg">
        <div className="mesh-glow-1"></div>
        <div className="mesh-glow-2"></div>
      </div>

      <div className="container">
        <div className="hero-inner">
          
          {/* Left Text */}
          <div className="hero-text">
            {/* Beta Badge */}
            <div className="hero-beta-badge">
              <span className="badge-icon">⚙</span>
              <span>Beta Version is Live!</span>
            </div>

            <h1 className="hero-heading">
              Automate Smarter. <br />
              <span className="serif-italic">
                Work Faster<span className="heading-comma">,</span>
                <span className="lightning-icon">⚡</span>
              </span>
            </h1>

            <p className="hero-sub-desc">
              Say goodbye to repetitive tasks. Our AI-driven platform streamlines your pharmacy ledgers so your team can focus on what really matters.
            </p>

            <div className="hero-actions-new">
              <a
                href="#features"
                className="btn-action-white"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See It in Action
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.pharmocare.medicalledger"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-action-glass"
              >
                <span>Play Store</span>
                <span className="play-arrow">▶</span>
              </a>
            </div>
            
          </div>

          {/* Right Visual: Premium SVG Dial Overlay */}
          <div className="hero-visual-new">
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-dial-svg">
              <defs>
                <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                  <stop offset="0%" stopColor="#f5f3ff" stopOpacity="0.6"/>
                  <stop offset="70%" stopColor="#e0e7ff" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.0"/>
                </radialGradient>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1"/>
                </linearGradient>
                <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="10" dy="20" stdDeviation="15" floodColor="#4f46e5" floodOpacity="0.12"/>
                </filter>
              </defs>
              
              {/* Layer 1: Radial Soft Gradient Background */}
              <circle cx="450" cy="450" r="400" fill="url(#dialGrad)" />
              
              {/* Layer 2: Major Outer Gauge Arc */}
              <circle cx="450" cy="450" r="320" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="5, 5" />
              
              {/* Layer 3: The Radial Tick Marks Ring */}
              <circle cx="450" cy="450" r="280" stroke="url(#ringGrad)" strokeWidth="32" strokeDasharray="3, 12" />
              
              {/* Layer 4: Clean Inner Guideline */}
              <circle cx="450" cy="450" r="264" stroke="rgba(129, 140, 248, 0.25)" strokeWidth="1.5" />
              
              {/* Layer 5: Thick Solid Highlight Arc segment */}
              <path d="M 170 450 A 280 280 0 0 1 450 170" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              
              {/* Layer 6: Main Lavender 3D Dial Body */}
              <circle cx="450" cy="450" r="230" fill="#eef2ff" filter="url(#dropShadow)" />
              <circle cx="450" cy="450" r="230" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="4" />
              
              {/* Layer 7: Inner Accent Rings */}
              <circle cx="450" cy="450" r="180" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="2.5" />
              <circle cx="450" cy="450" r="140" stroke="rgba(129, 140, 248, 0.1)" strokeWidth="1" strokeDasharray="10, 4" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
