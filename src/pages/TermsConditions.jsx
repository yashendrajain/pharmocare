import React from 'react';

export default function TermsConditions() {
  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Terms & Conditions</h1>
        <p style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.7, color: 'var(--text-primary)' }}>
          <p>
            Welcome to PharmoCare. By accessing or using our application, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use our Services.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>1. App Usage and License</h3>
          <p>
            We grant you a personal, non-exclusive, non-transferable, and revocable license to use PharmoCare for managing your pharmacy ledgers and invoices. You agree not to use the app for any illegal or unauthorized purpose, nor violate any laws in your jurisdiction (including but not limited to financial and copyright laws).
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>2. User Responsibilities & Data Accuracy</h3>
          <p>
            PharmoCare utilizes AI (Google Gemini) to extract data from invoices. While we strive for high accuracy, the AI is not infallible. <strong>You are solely responsible for reviewing and verifying the accuracy of all extracted data (including rates, quantities, and GST) before saving it to your ledger.</strong> We are not liable for any financial discrepancies, tax calculation errors, or business losses resulting from the use of our AI extraction tools.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>3. Prohibited Activities</h3>
          <p>As a user of the application, you agree not to:</p>
          <ul style={{ paddingLeft: '24px', color: 'var(--text-secondary)' }}>
            <li>Upload invoices or documents that do not belong to your business or that you do not have permission to process.</li>
            <li>Use the application to defraud suppliers, customers, or tax authorities.</li>
            <li>Interfere with, disrupt, or create an undue burden on the application or the networks connected to the application.</li>
            <li>Attempt to reverse-engineer, decompile, or extract the source code or AI integration mechanisms of the app.</li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>4. Third-Party Services</h3>
          <p>
            The application relies on third-party services, primarily Google Gemini AI, to function. Your use of the app is also subject to the terms and policies of these third-party providers. We reserve the right to change our AI providers or infrastructure without prior notice.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>5. Intellectual Property</h3>
          <p>
            All source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the application (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>6. Limitation of Liability</h3>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the application.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>7. Termination</h3>
          <p>
            We may terminate or suspend your access to the application immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the application will immediately cease.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>8. Contact Us</h3>
          <p>
            If you have any questions or concerns about these Terms & Conditions, please contact us at:
            <br/><br/>
            <strong>Email:</strong> <a href="mailto:yashendrajainoffical@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>yashendrajainoffical@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
