import React from 'react';
import { 
  Brain, Landmark, TrendingUp, Download,
  Wallet, BellRing, Search, Clock, FileCheck, 
  Users, Lock, Cloud, ShieldCheck, Zap
} from 'lucide-react';

export default function Features() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        
        <div className="section-header">
          <h2 className="section-title">Built for the Modern Pharmacy</h2>
          <p className="section-desc">
            Everything you need to manage distributors, invoices, stock margins, and statements — in one intelligent, easy-to-use app.
          </p>
        </div>

        {/* Bento Section 1: The Core Experience */}
        <div className="features-grid">
          
          {/* Card 1: AI Invoice Scanner (Tall Blue Left) */}
          <div className="bento-card bento-adv-1">
            <div className="bento-card-content">
              <div className="feature-icon">
                <Brain strokeWidth={1.5} size={24} />
              </div>
              <h3 className="feature-title">AI Bill Scanner</h3>
              <p className="feature-desc">
                Scan distributor invoices and automatically extract medicines, rates, GST, batch numbers, and quantities with AI precision.
              </p>
            </div>
            <div className="bento-card-img-container">
              <img src="/2.png" alt="AI Invoice Scanner" />
            </div>
          </div>

          {/* Card 2: Ledger Management (Tall White Middle) */}
          <div className="bento-card bento-adv-2">
            <div className="bento-card-content">
              <div className="feature-icon" style={{ color: '#188038', background: '#e8f5e9' }}>
                <Landmark strokeWidth={1.5} size={24} />
              </div>
              <h3 className="feature-title">Smart Supplier Ledger</h3>
              <p className="feature-desc">
                Maintain separate ledgers for every distributor with automatic balance calculations.
              </p>
            </div>
            <div className="bento-card-img-container">
              <img src="/3.png" alt="Ledger Management" />
            </div>
          </div>

          {/* Card 3: Margin Analysis (Square Top Right) */}
          <div className="bento-card bento-adv-3">
            <div className="bento-card-content">
              <div className="feature-icon" style={{ color: '#f29900', background: '#ffffff' }}>
                <TrendingUp strokeWidth={1.5} size={24} />
              </div>
              <h3 className="feature-title">Purchase Analytics</h3>
              <p className="feature-desc" style={{ fontSize: '0.9rem' }}>
                Track total purchases, supplier-wise spending, and medicine-wise expenses.
              </p>
            </div>
          </div>

          {/* Card 4: Auto Reports (Square Bottom Right) */}
          <div className="bento-card bento-adv-4">
            <div className="bento-card-content">
              <div className="feature-icon" style={{ color: '#9c27b0', background: '#ffffff' }}>
                <Download strokeWidth={1.5} size={24} />
              </div>
              <h3 className="feature-title">PDF & Excel Exports</h3>
              <p className="feature-desc" style={{ fontSize: '0.9rem' }}>
                Generate professional supplier ledger statements and export them instantly.
              </p>
            </div>
          </div>

        </div>

        {/* Bento Section 2: Payments & Analytics */}
        <div className="section-header" style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h2 className="section-title" style={{ fontSize: '2rem' }}>Payments & Tracking</h2>
        </div>
        <div className="secondary-bento-grid">
          <div className="feature-card">
            <div className="feature-icon"><Wallet strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Outstanding Balances</h3>
            <p className="feature-desc">Know exactly how much you owe each supplier in real time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FileCheck strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Payment Receipts</h3>
            <p className="feature-desc">Record supplier payments and automatically update ledger balances.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><TrendingUp strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Price Insights</h3>
            <p className="feature-desc">Track distributor rate changes over time and identify best suppliers.</p>
          </div>
        </div>

        {/* Bento Section 3: Tech & Security */}
        <div className="section-header" style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h2 className="section-title" style={{ fontSize: '2rem' }}>Enterprise Security</h2>
        </div>
        <div className="secondary-bento-grid">
          <div className="feature-card">
            <div className="feature-icon"><Zap strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Instant Processing</h3>
            <p className="feature-desc">Convert paper invoices into structured digital records within seconds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Cloud strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Secure Cloud Backup</h3>
            <p className="feature-desc">Your pharmacy data is safely stored and accessible anywhere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><ShieldCheck strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Business-Grade Security</h3>
            <p className="feature-desc">Protect sensitive supplier and purchase information natively.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Users strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Multi-Staff Access</h3>
            <p className="feature-desc">Allow employees to manage records with controlled permissions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Search strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Powerful Search</h3>
            <p className="feature-desc">Instantly find suppliers, invoices, medicines, or transactions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Clock strokeWidth={1.5} size={24} /></div>
            <h3 className="feature-title">Transaction Timeline</h3>
            <p className="feature-desc">View complete supplier transaction history in chronological order.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
