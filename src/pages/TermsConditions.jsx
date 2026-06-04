import React from 'react';

export default function TermsConditions() {
  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Terms &amp; Conditions</h1>
        <p style={{ marginBottom: '24px' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>1. Agreement to Terms</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          By accessing or using PharmoCare, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you do not have permission to access the Service.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>2. Use of Service</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          PharmoCare provides AI-powered ledger management and invoice scanning services. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the service.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>3. User Accounts</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>4. Intellectual Property</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          The Service and its original content, features, and functionality are and will remain the exclusive property of PharmoCare and its licensors. The Service is protected by copyright, trademark, and other laws.
        </p>
        
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>5. AI Processing and Accuracy</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          While we strive for high accuracy using Google Gemini AI for invoice processing, you acknowledge that AI extraction may occasionally produce errors. You are responsible for reviewing and verifying the extracted ledger data before finalizing records.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>6. Contact Us</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          If you have any questions about these Terms, please contact us at: <a href="mailto:yashendra.jain.dev@gmail.com">yashendra.jain.dev@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
