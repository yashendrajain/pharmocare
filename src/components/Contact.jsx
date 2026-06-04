import React from 'react';
import { Mail } from 'lucide-react';

export default function Contact() {
  const handleContactClick = () => {
    const subject = encodeURIComponent(`PharmoCare Inquiry`);
    window.location.href = `mailto:yashendrajainoffical@gmail.com?subject=${subject}`;
  };

  return (
    <section className="section contact-section" id="contact" style={{ padding: '80px 24px', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <div style={{
          background: 'var(--primary)',
          borderRadius: '40px',
          padding: '80px 24px',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: 500, 
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            color: '#ffffff'
          }}>
            Get in touch with us
          </h2>
          
          <p style={{ 
            fontSize: '1.1rem', 
            maxWidth: '600px', 
            margin: '0 auto 40px',
            lineHeight: 1.6,
            color: '#ffffff'
          }}>
            Have questions about PharmoCare or want to collaborate? Reach out to us and be part of the journey.
          </p>
          
          <button 
            onClick={handleContactClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '100px',
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            }}
          >
            <Mail size={18} />
            Contact us
          </button>
        </div>

      </div>
    </section>
  );
}
