import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '24px' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>1. Introduction</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          At PharmoCare, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our application and use our services, including our AI-powered invoice scanning powered by Google Gemini AI.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>2. Data Collection</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          We may collect information about you in a variety of ways. The information we may collect includes:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <li><strong>Personal Data:</strong> Demographics and other personally identifiable information that you voluntarily give to us when registering with the application.</li>
          <li><strong>Invoice Data:</strong> Images of invoices and the extracted text data (medicine names, batch numbers, rates) processed securely via Google Gemini AI.</li>
          <li><strong>Ledger Data:</strong> Financial records and outstanding balances you input into the system.</li>
        </ul>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>3. Use of Your Information</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <li>Process and analyze invoices using AI.</li>
          <li>Generate accurate ledger statements and margin reports.</li>
          <li>Improve the accuracy of our OCR and data extraction models.</li>
          <li>Provide customer support.</li>
        </ul>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>4. Data Security</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', marginTop: '32px' }}>5. Contact Us</h3>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:yashendra.jain.dev@gmail.com">yashendra.jain.dev@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
