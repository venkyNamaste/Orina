import React from 'react';

function TermsAndConditions() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafc',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.8',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px 0',
      }}>
        {/* Header Section */}
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Terms and Conditions</h1>
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}><strong>Last updated: December 22, 2024</strong></p>
        <p>
          Welcome to <strong>Orina</strong>! These Terms and Conditions ("Terms") govern your use of our website located at 
          <a href="http://www.orina.in" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}> www.orina.in</a> ("Service").
        </p>
        <p>
          By accessing or using our Service, you agree to comply with these Terms. If you disagree with any part of these Terms, 
          please do not use our website or services.
        </p>

        {/* Table of Contents */}
        <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '8px', marginTop: '20px' }}>Table of Contents</h2>
        <ol style={{ paddingLeft: '20px' }}>
          <li><a href="#section1" style={{ color: '#3498db' }}>1. Definitions</a></li>
          <li><a href="#section2" style={{ color: '#3498db' }}>2. Acceptance of Terms</a></li>
          <li><a href="#section3" style={{ color: '#3498db' }}>3. User Responsibilities</a></li>
          <li><a href="#section4" style={{ color: '#3498db' }}>4. Account Registration</a></li>
          <li><a href="#section5" style={{ color: '#3498db' }}>5. Intellectual Property</a></li>
          <li><a href="#section6" style={{ color: '#3498db' }}>6. Prohibited Activities</a></li>
          <li><a href="#section7" style={{ color: '#3498db' }}>7. Payment Terms (if applicable)</a></li>
          <li><a href="#section8" style={{ color: '#3498db' }}>8. Termination</a></li>
          <li><a href="#section9" style={{ color: '#3498db' }}>9. Limitation of Liability</a></li>
          <li><a href="#section10" style={{ color: '#3498db' }}>10. Indemnification</a></li>
          <li><a href="#section11" style={{ color: '#3498db' }}>11. Governing Law</a></li>
          <li><a href="#section12" style={{ color: '#3498db' }}>12. Changes to Terms</a></li>
          <li><a href="#section13" style={{ color: '#3498db' }}>13. Contact Us</a></li>
        </ol>

        {/* Section 1 */}
        <h2 id="section1" style={{ marginTop: '30px', color: '#2c3e50' }}>1. Definitions</h2>
        <p>
          - "<strong>Service</strong>" refers to the website located at <a href="https://www.orina.in" style={{ color: '#3498db' }}>www.orina.in</a>.<br />
          - "<strong>User</strong>" refers to any person who accesses or uses the Service.<br />
          - "<strong>We</strong>", "<strong>Us</strong>", "<strong>Our</strong>" refers to Orina.
        </p>

        {/* Section 2 */}
        <h2 id="section2" style={{ marginTop: '30px', color: '#2c3e50' }}>2. Acceptance of Terms</h2>
        <p>
          By accessing or using our Service, you agree to be bound by these Terms. If you do not agree with any part, you may not access the Service.
        </p>

        {/* Section 3 */}
        <h2 id="section3" style={{ marginTop: '30px', color: '#2c3e50' }}>3. User Responsibilities</h2>
        <ul>
          <li>You agree not to misuse our Service.</li>
          <li>You must ensure the information you provide is accurate and up-to-date.</li>
          <li>You are responsible for safeguarding your account credentials.</li>
        </ul>

        {/* Section 4 */}
        <h2 id="section4" style={{ marginTop: '30px', color: '#2c3e50' }}>4. Account Registration</h2>
        <p>
          To access certain features, you may be required to create an account. You agree to:
        </p>
        <ul>
          <li>Provide accurate and complete information during registration.</li>
          <li>Maintain the confidentiality of your account credentials.</li>
        </ul>

        {/* Section 5 */}
        <h2 id="section5" style={{ marginTop: '30px', color: '#2c3e50' }}>5. Intellectual Property</h2>
        <p>
          All content on the Service, including text, images, and logos, is the intellectual property of Orina.
        </p>

        {/* Section 6 */}
        <h2 id="section6" style={{ marginTop: '30px', color: '#2c3e50' }}>6. Prohibited Activities</h2>
        <ul>
          <li>Engage in fraudulent activities.</li>
          <li>Distribute malware or spam.</li>
          <li>Violate any laws or regulations.</li>
        </ul>

          {/* Section 7 */}
      <h2 id="section7" style={{ marginTop: '30px', color: '#2c3e50' }}>7. Payment Terms (if applicable)</h2>
      <p>
        If our services require payment, you agree to pay all fees as specified. Payments are non-refundable unless stated otherwise.
      </p>

      {/* Section 8 */}
      <h2 id="section8" style={{ marginTop: '30px', color: '#2c3e50' }}>8. Termination</h2>
      <p>
        We may terminate or suspend your access to our Service without prior notice if you violate these Terms. Upon termination, your right to use the Service ceases immediately.
      </p>

      {/* Section 9 */}
      <h2 id="section9" style={{ marginTop: '30px', color: '#2c3e50' }}>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Orina shall not be liable for indirect, incidental, or consequential damages arising from your use of the Service.
      </p>

      {/* Section 10 */}
      <h2 id="section10" style={{ marginTop: '30px', color: '#2c3e50' }}>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold Orina harmless from any claims, losses, or damages arising from your violation of these Terms.
      </p>

      {/* Section 11 */}
      <h2 id="section11" style={{ marginTop: '30px', color: '#2c3e50' }}>11. Governing Law</h2>
      <p>
        These Terms are governed by and interpreted in accordance with the laws of **India**. Any disputes will be resolved in the courts of **Visakhapatnam**.
      </p>

      {/* Section 12 */}
      <h2 id="section12" style={{ marginTop: '30px', color: '#2c3e50' }}>12. Changes to Terms</h2>
      <p>
        We reserve the right to update these Terms at any time. Continued use of the Service after updates constitutes acceptance of the revised Terms.
      </p>


        {/* Section 13 */}
        <h2 id="section13" style={{ marginTop: '30px', color: '#2c3e50' }}>13. Contact Us</h2>
        <p>
          Orina<br />
          Visakhapatnam, Andhra Pradesh, India<br />
          Email: <a href="mailto:support@orina.in" style={{ color: '#3498db' }}>support@orina.in</a>
        </p>

        <p style={{ textAlign: 'center', marginTop: '40px', color: '#7f8c8d' }}>
          Thank you for reading our Terms and Conditions.
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
