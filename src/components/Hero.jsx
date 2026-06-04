import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-inner">
          
          {/* Left Text */}
          <div className="hero-text">
            <div className="hero-powered-by">
              <span className="powered-text">powered by</span>
              <img src="/gemini-logo.svg" alt="Gemini" className="powered-logo" />
            </div>

            <h1 className="hero-heading">
              India's Smart Pharmacy Ledger App
            </h1>

            <p className="hero-sub" style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Scan Bills • Track Supplier Dues • Manage Payments Automatically
            </p>

            <p className="hero-sub">
              PharmoCare helps medical stores manage purchase bills, supplier ledgers, payments, and outstanding balances through AI-powered invoice scanning and automated accounting.
            </p>

            <div className="hero-actions">
              <a
                href="/pharmocare.apk"
                download="PharmoCare.apk"
                className="btn-primary"
              >
                Download APK
              </a>
              <a
                href="#features"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Features
              </a>
            </div>
            
            <div style={{ marginTop: '32px', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
              The new standard for modern pharmacies
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero-visual">
            <img 
              src="/1.png" 
              alt="PharmoCare Ledger Summary" 
              className="hero-phone"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
