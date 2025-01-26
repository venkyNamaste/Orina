import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully, we will get back to you shortly!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafc',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Contact Us</h1>
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
          Have questions? Fill out the form below, and we'll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#3498db',
              color: '#ffffff',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
        {status && (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#2c3e50' }}>{status}</p>
        )}
         {/* Contact Information */}
         <div style={{
          marginTop: '40px',
          textAlign: 'center',
          color: '#7f8c8d',
          fontSize: '14px'
        }}>
          <p><strong>Email:</strong> <a href="mailto:support@orina.in" style={{ color: '#3498db' }}>support@orina.in</a></p>
 
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
