import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

// Public Pages
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Auth from './pages/Auth';

// Protected Pages
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Firms from './pages/Firms';
import FirmLedger from './pages/FirmLedger';

function SiteLayout() {
  return (
    <>
      <Header />
      <PageLoader>
        <Outlet />
      </PageLoader>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Site */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
      </Route>

      {/* Auth Page */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected Dashboard */}
      <Route path="/app" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="firms" element={<Firms />} />
        <Route path="firms/:id" element={<FirmLedger />} />
      </Route>
    </Routes>
  );
}
