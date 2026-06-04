import React from 'react';
import { Brain, FileText, Send, Landmark, ShieldCheck, Heart } from 'lucide-react';

const integrations = [
  { icon: Brain, label: 'Google Gemini AI' },
  { icon: ShieldCheck, label: 'Secure Cloud Infrastructure' },
  { icon: FileText, label: 'Professional Export Engine' },
  { icon: Landmark, label: 'Expiry Alert System' },
];

export default function WorksWith() {
  return (
    <section className="works-section">
      <div className="container">
        <h3 className="works-title">Seamless Integrations</h3>
        <div className="works-logos">
          {integrations.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="works-logo">
                <Icon strokeWidth={1.5} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
