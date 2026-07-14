import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ReceiptText, ShieldCheck, Database, FileDigit } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="fade-in-up" style={{ padding: '120px 0 80px 0', background: 'var(--surface-variant)' }}>
      <div className="container">
        
        {/* Company Hero Intro */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(26, 115, 232, 0.08)', 
            color: '#1a73e8', 
            padding: '6px 16px', 
            borderRadius: '100px', 
            fontSize: '0.875rem', 
            fontWeight: 600,
            marginBottom: '24px'
          }}>
            <Sparkles size={14} />
            <span>PharmoCare Technology Suite</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: '24px'
          }}>
            Smart Digital Solutions <br />
            <span style={{ color: '#1a73e8' }}>For Modern Healthcare</span>
          </h1>

          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            PharmoCare designs next-generation workflow assistants and AI scanners to simplify accounting, tracking, and diagnostics for pharmacies and medical labs.
          </p>
        </div>

        {/* Dual App Showcase Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '40px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          
          {/* Card 1: PharmoLedger */}
          <div className="glass-panel" style={{ 
            background: '#ffffff',
            border: '1px solid var(--outline)',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: 'var(--shadow-2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform var(--t-fast), box-shadow var(--t-fast)',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/pharmoledger')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-2)';
          }}
          >
            <div>
              {/* Product Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'rgba(26, 115, 232, 0.08)', 
                  color: '#1a73e8', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <ReceiptText size={24} />
                </div>
                <span style={{ 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  color: '#10b981', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  padding: '4px 10px', 
                  borderRadius: '100px' 
                }}>ACTIVE APP</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                PharmoLedger
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, marginBottom: '24px' }}>
                India's leading pharmacy ledger application. Scan distributor invoices with Gemini AI, balance credits, track payments, and manage supplier transactions automatically.
              </p>

              {/* Bullet Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <ShieldCheck size={16} style={{ color: '#10b981' }} />
                  <span>AI Invoice Scanning</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <ShieldCheck size={16} style={{ color: '#10b981' }} />
                  <span>Real-time Supplier Balances</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <ShieldCheck size={16} style={{ color: '#10b981' }} />
                  <span>Automated Payment Reminders</span>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/pharmoledger');
                }} 
                className="btn-primary"
                style={{ 
                  flex: 1, 
                  height: '48px', 
                  borderRadius: '12px', 
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <span>Explore App</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2: Pathora */}
          <div className="glass-panel" style={{ 
            background: '#ffffff',
            border: '1px solid var(--outline)',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: 'var(--shadow-2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform var(--t-fast), box-shadow var(--t-fast)',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/pathora')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-2)';
          }}
          >
            <div>
              {/* Product Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'rgba(26, 115, 232, 0.08)', 
                  color: '#1a73e8', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Database size={24} />
                </div>
                <span style={{ 
                  background: 'rgba(26, 115, 232, 0.08)', 
                  color: '#1a73e8', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  padding: '4px 10px', 
                  borderRadius: '100px' 
                }}>DEVELOPMENT</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Pathora
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, marginBottom: '24px' }}>
                Automated clinical pathology reports and diagnostic analyzer. Created for labs and diagnostic centers to streamline counting, check indicators, and notify anomalies.
              </p>

              {/* Bullet Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <FileDigit size={16} style={{ color: 'var(--text-tertiary)' }} />
                  <span>Lab PDF Report Extractor</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <FileDigit size={16} style={{ color: 'var(--text-tertiary)' }} />
                  <span>Counts & Vitals Analytics</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <FileDigit size={16} style={{ color: 'var(--text-tertiary)' }} />
                  <span>Abnormal Indicator Flags</span>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/pathora');
                }} 
                className="btn-secondary"
                style={{ 
                  flex: 1, 
                  height: '48px', 
                  borderRadius: '12px', 
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <span>Preview Pathora</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
