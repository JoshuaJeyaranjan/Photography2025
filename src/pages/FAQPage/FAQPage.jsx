import React from 'react';
import './FaqPage.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BacktoTop/BacktoTop';

function FaqPage() {
  const faqs = [
    {
      question: 'What type of photography do you specialize in?',
      answer: 'I specialize in portrait photography. My goal is to capture authentic moments and create timeless images you will cherish forever.'
    },
    {
      question: 'How do I book a session with you?',
      answer: 'You can book a session by visiting the "Contact" page and filling out the form. Please provide as much detail as possible about your needs, and I will get back to you within 48 hours to discuss the details and availability.'
    },
    {
      question: 'What are your rates?',
      answer: 'My rates vary depending on the type of session, duration, and location. Please contact me with the details of your project for a custom quote. I offer various packages to suit different needs and budgets.'
    },
    {
      question: 'How and when will I receive my photos?',
      answer: 'You will receive a link to a private online gallery with your edited, high-resolution photos within 2-3 weeks after the session. From there, you can download your images and order prints.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'A non-refundable deposit is required to secure your booking. If you need to cancel, please notify me at least 7 days in advance. We can reschedule your session for a future date based on availability. Cancellations made less than 7 days before the session will forfeit the deposit.'
    },
    {
      question: 'Do you travel for photoshoots?',
      answer: 'Absolutely! I love to travel for shoots. Travel fees may apply for locations outside of the Greater Toronto Area. Please mention the location when you contact me for a more accurate quote.'
    }
  ];

  return (
    <>
      <Nav />
      <main className="faq-page">
        <div className="faq-content">
          <div className="faq-header">
            <h1 className='italiana-regular'>Frequently Asked Questions</h1>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <h2 className='poppins-light'>{faq.question}</h2>
                <p className='poppins-light'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}

export default FaqPage;