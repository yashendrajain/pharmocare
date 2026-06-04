import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.7, color: 'var(--text-primary)' }}>
          <p>
            Welcome to PharmoCare ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy governs the privacy policies and practices of our application, PharmoCare, and complies with the Google Play Store Developer Policy requirements regarding user data collection, use, and sharing.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>1. Information We Collect</h3>
          <p>We collect information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the application.</p>
          <ul style={{ paddingLeft: '24px', color: 'var(--text-secondary)' }}>
            <li><strong>Personal Information:</strong> We may collect names, email addresses, phone numbers, pharmacy business names, and similar contact information.</li>
            <li><strong>Camera and Photos:</strong> Our app requires access to your device's camera and photo gallery strictly for the purpose of scanning distributor invoices and bills.</li>
            <li><strong>Financial and Ledger Data:</strong> We process the financial data you input, including supplier details, outstanding dues, and payment records to provide our ledger services.</li>
            <li><strong>Device Data:</strong> We may automatically collect device information (such as IP address, device model, and operating system) for crash reporting and app optimization.</li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>2. How We Use Your Information</h3>
          <p>We use personal information collected via our application for a variety of business purposes described below:</p>
          <ul style={{ paddingLeft: '24px', color: 'var(--text-secondary)' }}>
            <li><strong>To facilitate AI Invoice Processing:</strong> We utilize Google Gemini AI to extract structured data (medicines, rates, GST, quantities) from the invoice images you upload.</li>
            <li><strong>To manage your account:</strong> We use your information to maintain your profile and keep track of your supplier ledgers securely.</li>
            <li><strong>To provide customer support:</strong> To respond to your inquiries and solve any potential issues you might have with the use of our app.</li>
            <li><strong>To improve our Services:</strong> For data analysis, identifying usage trends, and determining the effectiveness of our app features.</li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>3. Third-Party Data Sharing (Google Gemini AI)</h3>
          <p>
            To provide our core invoice scanning functionality, images of invoices are transmitted securely via API to Google Gemini AI. By using the scanning feature, you consent to this data processing. We do not sell, rent, or trade your personal information or financial data to any third parties for marketing or advertising purposes.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>4. Data Retention and Deletion</h3>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). You have the right to request the deletion of your account and all associated ledger data at any time by contacting us. Upon request, we will securely delete your data from our active databases.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>5. Data Security</h3>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>6. Children's Privacy</h3>
          <p>
            Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>7. Changes to This Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time to remain compliant with relevant laws and Google Play Store policies. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>8. Contact Us</h3>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact the developer at: 
            <br/><br/>
            <strong>Email:</strong> <a href="mailto:yashendrajainoffical@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>yashendrajainoffical@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
