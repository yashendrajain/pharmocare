import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { LayoutDashboard, Building2, LogOut, Bell, Settings } from 'lucide-react';

export default function DashboardLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
      setLoading(false);
      
      if (session) {
        if (location.pathname === '/auth') {
          navigate('/app/dashboard');
        }
      } else {
        navigate('/auth');
      }
    });

    // Fallback timer: if we're in callback flow and didn't get authenticated in 4s, go back to auth
    let fallbackTimer;
    if (isCallbackFlow) {
      fallbackTimer = setTimeout(() => {
        if (isMounted && loading) {
          navigate('/auth');
          setLoading(false);
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
    await supabase.auth.signOut();
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
          {/* Logo (Boltshift Style Lightning Bolt) */}
          <div className="brand" onClick={() => navigate('/app/dashboard')} style={{ cursor: 'pointer' }}>
            <div className="brand-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <span className="brand-name">PharmoCare</span>
          </div>

          {/* Navigation Pills (Center) */}
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

          {/* Controls & User Profile Widget (Right) */}
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
        </div>
      </header>

      {/* Main Content Container */}
      <main className="dashboard-main-content">
        <div className="dashboard-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
