import React from 'react';

function PrivacyPolicy() {
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
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Privacy Policy</h1>
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}><strong>Last updated: December 22, 2024</strong></p>
        
        <p>
          This Privacy Notice for <strong>Orina</strong> ("we," "us," or "our") explains how we collect, use, disclose, and safeguard your information when you use our services ("Services"), including:
        </p>
        <ul>
          <li>Visiting our website at <a href="https://www.orina.in" style={{ color: '#3498db' }} target="_blank" rel="noopener noreferrer">www.orina.in</a></li>
          <li>Engaging with us in sales, marketing, or events</li>
        </ul>
        <p>
          If you have any questions, please contact us at <a href="mailto:support@orina.in" style={{ color: '#3498db' }}>support@orina.in</a>.
        </p>

        {/* Summary of Key Points */}
        <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '8px', marginTop: '20px' }}>Summary of Key Points</h2>
        <p><em>This summary highlights key points of our Privacy Notice. More details are available below.</em></p>
        <ul>
          <li><strong>What personal information do we process?</strong> We collect personal data depending on how you interact with us.</li>
          <li><strong>Do we process sensitive information?</strong> No, we do not process sensitive personal data.</li>
          <li><strong>Do we share information with third parties?</strong> We may share personal data in specific scenarios.</li>
          <li><strong>What are your rights?</strong> You have rights over your personal data.</li>
          <li><strong>How can you contact us?</strong> Reach out to us at <a href="mailto:support@orina.in" style={{ color: '#3498db' }}>support@orina.in</a>.</li>
        </ul>

        {/* Table of Contents */}
        <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '8px', marginTop: '20px' }}>Table of Contents</h2>
        <ol style={{ paddingLeft: '20px' }}>
          <li><a href="#section1" style={{ color: '#3498db' }}>1. What Information Do We Collect?</a></li>
          <li><a href="#section2" style={{ color: '#3498db' }}>2. How Do We Process Your Information?</a></li>
          <li><a href="#section3" style={{ color: '#3498db' }}>3. When and With Whom Do We Share Your Information?</a></li>
          <li><a href="#section4" style={{ color: '#3498db' }}>4. Do We Use Cookies and Tracking Technologies?</a></li>
          <li><a href="#section5" style={{ color: '#3498db' }}>5. How Long Do We Keep Your Information?</a></li>
          <li><a href="#section6" style={{ color: '#3498db' }}>6. Do We Collect Information From Minors?</a></li>
          <li><a href="#section7" style={{ color: '#3498db' }}>7. What Are Your Privacy Rights?</a></li>
          <li><a href="#section8" style={{ color: '#3498db' }}>8. Controls for Do-Not-Track Features</a></li>
          <li><a href="#section9" style={{ color: '#3498db' }}>9. Do We Make Updates to This Notice?</a></li>
          <li><a href="#section10" style={{ color: '#3498db' }}>10. How Can You Contact Us?</a></li>
          <li><a href="#section11" style={{ color: '#3498db' }}>11. How Can You Review, Update, or Delete Your Data?</a></li>
        </ol>

        {/* Sections */}
        <h2 id="section1" style={{ marginTop: '30px', color: '#2c3e50' }}>1. What Information Do We Collect?</h2>
        <p>
          We collect personal data that you voluntarily provide when you use our services, including:
        </p>
        <ul>
          <li>Email addresses</li>
          <li>Any other information you provide directly</li>
        </ul>

        <h2 id="section2" style={{ marginTop: '30px', color: '#2c3e50' }}>2. How Do We Process Your Information?</h2>
        <ul>
          <li>Provide, improve, and manage our services</li>
          <li>Ensure security and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 id="section3" style={{ marginTop: '30px', color: '#2c3e50' }}>3. When and With Whom Do We Share Your Information?</h2>
        <ul>
          <li><strong>Business Transfers:</strong> During a merger, acquisition, or sale of assets.</li>
          <li><strong>Legal Obligations:</strong> When required by law or court orders.</li>
        </ul>

        <h2 id="section4" style={{ marginTop: '30px', color: '#2c3e50' }}>4. Do We Use Cookies and Tracking Technologies?</h2>
      <p>
        Yes, we use cookies and tracking technologies to:
      </p>
      <ul>
        <li>Improve user experience</li>
        <li>Ensure site security</li>
        <li>Analyze website traffic</li>
      </ul>

      <h2 id="section5" style={{ marginTop: '30px', color: '#2c3e50' }}>5. How Long Do We Keep Your Information?</h2>
      <p>
        We retain your data as long as necessary for the purposes outlined in this notice unless a longer retention period is required by law.
      </p>

      <h2 id="section6" style={{ marginTop: '30px', color: '#2c3e50' }}>  6. Do We Collect Information From Minors?</h2>
      <p>
        No, we do not knowingly collect data from individuals under 18 years old.
      </p>

      <h2 id="section7" style={{ marginTop: '30px', color: '#2c3e50' }}>7. What Are Your Privacy Rights?</h2>
      <p>
        You have the right to:
      </p>
      <ul>
        <li>Access your data</li>
        <li>Request corrections</li>
        <li>Delete your data</li>
        <li>Withdraw consent</li>
      </ul>
      <p>To exercise these rights, contact us at <a href="mailto:support@orina.in">support@orina.in</a>.</p>

      <h2 id="section8" style={{ marginTop: '30px', color: '#2c3e50' }}>8. Controls for Do-Not-Track Features</h2>
      <p>
        Currently, there is no universal standard for recognizing Do-Not-Track signals.
      </p>

      <h2 id="section9" style={{ marginTop: '30px', color: '#2c3e50' }}>9. Do We Make Updates to This Notice?</h2>
      <p>
        Yes, we may update this Privacy Notice periodically. The updated date will be displayed at the top of this page.
      </p>


        <h2 id="section10" style={{ marginTop: '30px', color: '#2c3e50' }}>10. How Can You Contact Us?</h2>
        <p>
          Orina<br />
          Visakhapatnam, Andhra Pradesh, India<br />
          Email: <a href="mailto:support@orina.in" style={{ color: '#3498db' }}>support@orina.in</a>
        </p>

        <h2 id="section11" style={{ marginTop: '30px', color: '#2c3e50' }}>11. How Can You Review, Update, or Delete Your Data?</h2>
        <p>
          You may submit a <a href="#" style={{ color: '#3498db' }}>data subject access request</a> to review or delete your data.
        </p>

        <p style={{ textAlign: 'center', marginTop: '40px', color: '#7f8c8d' }}>
          Thank you for taking the time to read our Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
