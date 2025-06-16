import React, { useState } from 'react';
import './ContactPage.scss'
import Nav from '../../components/Nav/Nav'; // Assuming you want Nav here
import Footer from '../../components/Footer/Footer'; // Assuming you want Footer here
import BackToTop from '../../components/BacktoTop/BacktoTop';
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

  const API_BASE_URL = 'https://photography2025server.onrender.com/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
  
    try {
      // Use the full API URL for the contact endpoint
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        setStatus(` ${result.message || ''}`);
        setFormData({ name: '', email: '', message: '' }); // Clear form on success
      } else {
        // Try to parse error response, fallback to status text
        let errorMsg = response.statusText;
        try {
          const errorResult = await response.json();
          errorMsg = errorResult.error || errorMsg;
        } catch (_) {
          // Ignore JSON parse errors here
        }
        setStatus(`Failed to send message: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('Failed to send message. Please try again later.');
    }
  };
  

  return (
    <>
    <Nav />
    
    <div className="contact-page">
      
    <div className="contact-page__content-wrapper">
        <h1 className='contact-page__title'>Contact Me</h1>
        <p className='contact-page__text'>Have a question or want to book a session? Fill out the form below.</p>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label  htmlFor="name" className='contact-page__text' >Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className='contact-page__text'>Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message" className='contact-page__text'>Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
          </div>
          <button type="submit" disabled={status === 'Sending...'}>Send Message</button>
        </form>
        {status && <p className="form-status">{status}</p>}
      </div>
    </div>
    <Footer/>
    <BackToTop/>  
    </>
  );
}

export default ContactPage