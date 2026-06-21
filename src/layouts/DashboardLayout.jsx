import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { LayoutDashboard, Building2, LogOut, Bell, Menu, X } from 'lucide-react';

export default function DashboardLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    // Check if we are currently processing a redirect/callback hash or code
    const hasHash = window.location.hash && (
      window.location.hash.includes('access_token') || 
      window.location.hash.includes('error')
    );
    const hasCode = window.location.search && window.location.search.includes('code=');
    const isCallbackFlow = hasHash || hasCode;

    // First fetch session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!isMounted) return;
      
      if (currentSession) {
        setSession(currentSession);
        setLoading(false);
      } else if (!isCallbackFlow) {
        // Only redirect to /auth if we are NOT in the middle of a redirect callback
        navigate('/auth');
        setLoading(false);
      }
    });

    // Listen to changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      setSession(session);
      
      if (session) {
        setLoading(false);
        if (location.pathname === '/auth') {
          navigate('/app/dashboard');
        }
      } else {
        // Only redirect to /auth if we are NOT in the middle of a redirect callback
        if (!isCallbackFlow) {
          navigate('/auth');
          setLoading(false);
        }
      }
    });

    // Fallback timer: if we're in callback flow and didn't get authenticated in 4s, go back to auth
    let fallbackTimer;
    if (isCallbackFlow) {
      fallbackTimer = setTimeout(() => {
        if (isMounted) {
          supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            if (!currentSession) {
              navigate('/auth');
              setLoading(false);
            }
          });
        }
      }, 4000);
    }

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    setDrawerOpen(false);
    await supabase.auth.signOut();
  };

  const handleNavClick = () => {
    setDrawerOpen(false);
  };

  if (loading) {
    return <div className="dashboard-loading">Loading PharmoCare...</div>;
  }

  if (!session) return null;

  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Firms & Ledgers', path: '/app/firms', icon: Building2 },
  ];

  return (
    <div className="dashboard-layout top-nav-layout">
      {/* Top Header Navigation (Boltshift Style) */}
      <header className="dashboard-top-header">
        <div className="top-header-inner">
          {/* Logo (Official App Icon) */}
          <div className="brand" onClick={() => navigate('/app/dashboard')} style={{ cursor: 'pointer' }}>
            <img src="/icon.jpg" alt="PharmoCare Logo" className="dashboard-logo-img" />
            <span className="brand-name">PharmoCare</span>
          </div>

          {/* Navigation Pills (Center - Desktop) */}
          <nav className="top-nav-pills">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`top-nav-pill ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Controls & User Profile Widget (Right - Desktop) */}
          <div className="top-profile-section">
            <button className="icon-btn-circle" title="Notifications">
              <Bell size={18} />
            </button>
            <button className="icon-btn-circle" onClick={handleLogout} title="Sign Out">
              <LogOut size={18} />
            </button>
            
            <div className="user-profile-widget">
              <div className="user-avatar">{session.user.email[0].toUpperCase()}</div>
              <div className="user-details">
                <span className="user-name">Pharmacist</span>
                <span className="user-email">{session.user.email}</span>
              </div>
            </div>
          </div>

          {/* Hamburger Drawer Toggle Button (Mobile) */}
          <button 
            className="mobile-drawer-toggle" 
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Mobile Drawer Sidebar Navigation */}
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="brand" onClick={() => { navigate('/app/dashboard'); setDrawerOpen(false); }} style={{ cursor: 'pointer' }}>
            <img src="/icon.jpg" alt="PharmoCare Logo" className="dashboard-logo-img" />
            <span className="brand-name">PharmoCare</span>
          </div>
          <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="drawer-content">
          <nav className="drawer-nav-links">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`drawer-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="drawer-divider" />

          <div className="drawer-profile-section">
            <div className="user-profile-widget vertical">
              <div className="user-avatar large">{session.user.email[0].toUpperCase()}</div>
              <div className="user-details">
                <span className="user-name">Pharmacist</span>
                <span className="user-email">{session.user.email}</span>
              </div>
            </div>

            <div className="drawer-actions">
              <button className="drawer-action-btn" title="Notifications" onClick={() => setDrawerOpen(false)}>
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              <button className="drawer-action-btn logout" onClick={handleLogout} title="Sign Out">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="dashboard-main-content">
        <div className="dashboard-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
