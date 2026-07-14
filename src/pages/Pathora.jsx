import React, { useState } from 'react';
import { Mail, Check, Bell, Sparkles, FileText, Activity } from 'lucide-react';

export default function Pathora() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <main className="pathora-page fade-in-up" style={{ padding: '120px 0 80px 0', background: 'var(--surface-variant)' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
          {/* Badge */}
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
            <span>Introducing Pathora</span>
            <span style={{ 
              background: '#1a73e8', 
              color: '#ffffff', 
              fontSize: '0.7rem', 
              padding: '2px 8px', 
              borderRadius: '100px',
              marginLeft: '4px'
            }}>COMING SOON</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: '24px'
          }}>
            AI-Powered Pathology <br />
            <span style={{ color: '#1a73e8' }}>& Lab Diagnostics Partner</span>
          </h1>

          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '650px',
            margin: '0 auto 40px auto'
          }}>
            Pathora automates laboratory report entries, structures patient health files, and highlights diagnostic warnings using next-generation clinical models.
          </p>

          {/* Waitlist Box */}
          <div className="glass-panel" style={{ 
            background: '#ffffff',
            border: '1px solid var(--outline)',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '500px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-2)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%', 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  color: '#10b981', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>You're on the list!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  We'll notify you as soon as early access slots open up for diagnostics.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', textAlign: 'left' }}>
                  Join the Beta Waitlist
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '20px', textAlign: 'left' }}>
                  Be the first to know when we launch the diagnostics module.
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ 
                    position: 'relative', 
                    flex: 1, 
                    minWidth: '240px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Mail style={{ 
                      position: 'absolute', 
                      left: '16px', 
                      color: 'var(--text-tertiary)' 
                    }} size={18} />
                    <input 
                      type="email" 
                      placeholder="Enter your lab email address" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ 
                        width: '100%', 
                        height: '48px', 
                        padding: '0 16px 0 48px', 
                        borderRadius: '12px', 
                        border: '1px solid var(--outline)',
                        background: 'var(--surface-variant)',
                        fontSize: '0.95rem'
                      }} 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{ 
                      height: '48px', 
                      padding: '0 24px', 
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Bell size={16} />
                    <span>Notify Me</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px', 
          marginTop: '80px' 
        }}>
          {/* Card 1 */}
          <div style={{ 
            background: '#ffffff', 
            padding: '32px', 
            borderRadius: '20px', 
            border: '1px solid var(--outline)',
            boxShadow: 'var(--shadow-1)'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'rgba(26, 115, 232, 0.08)', 
              color: '#1a73e8', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <FileText size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Automated PDF Parsing</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Upload lab diagnostic reports directly. Pathora extracts patient vitals, counts, and test codes in real time.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ 
            background: '#ffffff', 
            padding: '32px', 
            borderRadius: '20px', 
            border: '1px solid var(--outline)',
            boxShadow: 'var(--shadow-1)'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'rgba(26, 115, 232, 0.08)', 
              color: '#1a73e8', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Activity size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Vitals & Count Trends</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Track diagnostics histories over multiple visits. Chart blood cell levels, glucose metrics, and thyroid profiles.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ 
            background: '#ffffff', 
            padding: '32px', 
            borderRadius: '20px', 
            border: '1px solid var(--outline)',
            boxShadow: 'var(--shadow-1)'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'rgba(26, 115, 232, 0.08)', 
              color: '#1a73e8', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Sparkles size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Diagnostic Flagging</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Pathora highlights out-of-range counts with intelligent, multi-parameter clinical guidelines instantly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
