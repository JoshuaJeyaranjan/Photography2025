import React from 'react';
import './CustomerServicePage.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BacktoTop/BacktoTop';
import { Link } from 'react-router-dom';

function CustomerServicePage() {
  return (
    <>
      <Nav />
      <main className="content-page-layout">
        <div className="content-container">
          <div className="content-header">
            <h1 className='italiana-regular'>Customer Service</h1>
            <p className='poppins-light'>We're here to help with any questions or concerns you may have.</p>
          </div>

          <div className="content-section">
            <h2 className='poppins-light'>General Inquiries & Photoshoots</h2>
            <p className='poppins-light'>
              For questions about booking a session, collaborations, or any other general inquiries, the best way to reach us is through our contact form.
            </p>
            <Link to="/contact" className="service-link poppins-light">Go to Contact Page</Link>
          </div>

          <div className="content-section">
            <h2 className='poppins-light'>Frequently Asked Questions</h2>
            <p className='poppins-light'>
              Have a question about my process, rates, or photo delivery? I may have already answered it on my FAQ page.
            </p>
            <Link to="/faq" className="service-link poppins-light">View FAQs</Link>
          </div>

          <div className="content-section">
            <h2 className='poppins-light'>Print Order Support</h2>
            <p className='poppins-light'>
              <strong>Order Status & Tracking:</strong> You will receive a confirmation email once your order is placed, and another email with tracking information once your order has shipped.
            </p>
            <p className='poppins-light'>
              <strong>Shipping & Delivery:</strong> Please allow 5-7 business days for printing and processing, and an additional 5-10 business days for shipping, depending on your location.
            </p>
            <p className='poppins-light'>
              <strong>Returns & Exchanges:</strong> All print sales are final. We do not accept returns or exchanges. However, if your order arrives damaged or is incorrect, please see below.
            </p>
            <p className='poppins-light'>
              <strong>Damaged or Incorrect Orders:</strong> If your order arrives damaged or you received the wrong item, please contact me within 7 days of delivery with your order number and a photo of the issue. I will arrange for a replacement to be sent to you as soon as possible.
            </p>
          </div>

        </div>
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}

export default CustomerServicePage;

