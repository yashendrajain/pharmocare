import React from 'react';
import { Mail } from 'lucide-react';

export default function Contact() {
  const handleContactClick = () => {
    const subject = encodeURIComponent(`PharmoCare Inquiry`);
    window.location.href = `mailto:yashendrajainoffical@gmail.com?subject=${subject}`;
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <div className="contact-banner">
          <h2>
            Get in touch with us
          </h2>
          
          <p>
            Have questions about PharmoCare or want to collaborate? Reach out to us and be part of the journey.
          </p>
          
          <button onClick={handleContactClick}>
            <Mail size={18} />
            Contact us
          </button>
        </div>

      </div>
    </section>
  );
}
