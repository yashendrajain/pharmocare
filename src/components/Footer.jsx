import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features', isHash: true },
    { label: 'FAQ', href: '/#faq', isHash: true },
    { label: 'Download', href: '/pharmocare.apk', isExternal: true, download: 'PharmoCare.apk' },
  ],
  Legal: [
    { label: 'Contact', href: '/#contact', isHash: true },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Conditions', href: '/terms' },
  ],
};

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('/#', '');
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer-section">
      <div className="container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/icon.jpg" alt="PharmoCare Logo" />
              <span>PharmoCare</span>
            </div>
            <p className="footer-desc">
              Smart Ledger &amp; AI Invoice Assistant for pharmacies. Powered by Google Gemini AI.
            </p>
          </div>
          
          <div className="footer-links">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer-col">
                <h4>{category}</h4>
                <ul>
                  {links.map(link => (
                    <li key={link.label}>
                      {link.isExternal ? (
                        <a 
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={link.download}
                        >
                          {link.label}
                        </a>
                      ) : link.isHash ? (
                        <a 
                          href={link.href}
                          onClick={(e) => handleHashClick(e, link.href)}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} onClick={() => window.scrollTo(0,0)}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} PharmoCare. All rights reserved.</div>
          <div>
            Built by Yashendra Jain
          </div>
        </div>

      </div>
    </footer>
  );
}
