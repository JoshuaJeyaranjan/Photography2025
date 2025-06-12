import React, { useState } from 'react';
import './ContactPage.scss'
import Nav from '../../components/Nav/Nav'; // Assuming you want Nav here
import Footer from '../../components/Footer/Footer'; // Assuming you want Footer here

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // To show submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // We'll create this backend endpoint next
      const response = await fetch('http://localhost:3001/api/contact', { // Adjust if your server/proxy is different
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus(`Message sent successfully! ${result.message || ''}`);
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        const errorResult = await response.json();
        setStatus(`Failed to send message: ${errorResult.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <Nav />
      <h1>Contact Me</h1>
      <p>Have a question or want to book a session? Fill out the form below.</p>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
        </div>
        <button type="submit" disabled={status === 'Sending...'}>Send Message</button>
      </form>
      {status && <p className="form-status">{status}</p>}
      <Footer />
    </div>
  );
}

export default ContactPage