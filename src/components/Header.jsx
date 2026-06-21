import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch session on mount and subscribe to changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Prevent scrolling when mobile menu is open and change browser theme color
  useEffect(() => {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.backgroundColor = '#1a73e8';
      document.body.style.backgroundColor = '#1a73e8'; // Force Safari tint
      metaThemeColor.setAttribute('content', '#1a73e8');
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      metaThemeColor.setAttribute('content', '#ffffff');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#ffffff');
    };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    const id = href.replace('#', '');
    
    // If not on home page, navigate to home first, then scroll
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
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container" style={{ height: '100%' }}>
          <div className="header-inner">
            {/* Logo */}
            <Link to="/" className="header-logo" onClick={() => { setMenuOpen(false); window.scrollTo(0,0); }}>
              <img src="/icon.jpg" alt="PharmoCare" className="header-logo-img" />
              <span className={`header-logo-name ${menuOpen ? 'menu-open-text' : ''}`}>PharmoCare</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="header-nav">
              {navLinks.slice(1, 4).map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="header-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.875rem', height: '38px', display: 'flex', alignItems: 'center' }}
              >
                Get App
              </a>
              {session ? (
                <Link
                  to="/app/dashboard"
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.875rem', height: '38px', display: 'flex', alignItems: 'center' }}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.875rem', height: '38px', display: 'flex', alignItems: 'center' }}
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`header-hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner"></div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Nav Menu */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <button 
          className="mobile-menu-close" 
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-menu-content">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-nav-link"
              style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          {session ? (
            <Link
              to="/app/dashboard"
              className="mobile-nav-link mobile-nav-cta"
              style={{ animationDelay: `${0.1 + navLinks.length * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/auth"
              className="mobile-nav-link mobile-nav-cta"
              style={{ animationDelay: `${0.1 + navLinks.length * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
          <a
            href="/pharmocare.apk"
            download="PharmoCare.apk"
            className="mobile-nav-link"
            style={{ animationDelay: `${0.15 + navLinks.length * 0.05}s`, opacity: 0.8 }}
            onClick={() => setMenuOpen(false)}
          >
            Download APK
          </a>
        </div>
      </div>
    </>
  );
}
