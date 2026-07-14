import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const footerLinks = {
  Product: [
    { label: 'PharmoLedger', href: '/pharmoledger' },
    { label: 'Pathora Diagnostics', href: '/pathora' },
    { label: 'Google Play Store', href: 'https://play.google.com/store/apps/details?id=com.pharmocare.medicalledger', isExternal: true },
  ],
  Legal: [
    { label: 'Features', href: '/pharmoledger#features', isHash: true },
    { label: 'FAQ', href: '/pharmoledger#faq', isHash: true },
    { label: 'Contact', href: '/pharmoledger#contact', isHash: true },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashClick = (e, href) => {
    e.preventDefault();
    const id = href.split('#')[1];
    
    if (location.pathname !== '/pharmoledger') {
      navigate('/pharmoledger');
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
              <img src="/logo.png" alt="PharmoCare Logo" style={{ height: '32px', objectFit: 'contain' }} />
              <span>PharmoCare</span>
            </div>
            <p className="footer-desc">
              Smart Healthcare Technology Suite. Automating ledgers and diagnostic assistance.
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
