import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const faqs = [
  {
    q: 'How accurate is the Gemini AI invoice scanner?',
    a: 'PharmoCare uses Google Gemini\'s multimodal vision model to read structured data from photos of print invoices — including medicine names, batch numbers, purchase rates, GST percentages, and MRP.',
  },
  {
    q: 'Can I export ledger statements to share?',
    a: 'Yes! Inside any distributor view, tap "Export" to instantly generate a professionally formatted PDF or download an Excel sheet with your shop header and date filters.',
  },
  {
    q: 'Is my transaction data kept private?',
    a: 'Absolutely. Your pharmacy records are encrypted end-to-end and are never shared. We understand the high sensitivity of pricing structures and vendor relationships.',
  },
  {
    q: 'How does margin analysis work?',
    a: 'Every time an invoice is scanned, PharmoCare auto-calculates the margin % between your purchase rate and the MRP for each item, tracking distributor markup changes.',
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(0); // Default to first item active

  return (
    <section className="section faq-section" id="faq" style={{ padding: '100px 0' }}>
      <div className="container">
        
        <div className="faq-header-flex">
          <div className="faq-header-left">
            <div className="services-pill">FAQ</div>
            <h2 className="section-title" style={{ marginTop: '16px', marginBottom: 0, fontSize: '2.5rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Explore our<br />frequently asked<br />questions
            </h2>
          </div>
          <div className="faq-header-right">
            <p className="section-desc" style={{ fontSize: '1.1rem', margin: 0, maxWidth: '500px' }}>
              Focused on your unique needs, our app delivers intelligent solutions that blend deep pharmacy knowledge and cutting-edge AI to ensure lasting growth.
            </p>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-bar ${activeIdx === i ? 'active' : ''}`}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <div className="faq-bar-title">{faq.q}</div>
              <div className="faq-bar-desc">{faq.a}</div>
              <div className="faq-bar-arrow-container">
                <div className="faq-bar-arrow">
                  <ArrowRight strokeWidth={2} size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
