import React from 'react';
import './PrivacyPolicyPage.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BacktoTop/BacktoTop';

function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="content-page-layout">
        <div className="content-container">
          <div className="content-header">
            <h1>Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="content-section">
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Joshua Jey Photography (https://www.joshuajeyphotography.com).
            </p>
          </div>

          <div className="content-section">
            <h2>2. Personal Information We Collect</h2>
            <p>
              When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
            </p>
            <p>
              When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as “Order Information.”
            </p>
            <p>
              When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.
            </p>
          </div>

          <div className="content-section">
            <h2>3. How We Use Your Personal Information</h2>
            <p>
              We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
            </p>
            <ul>
              <li>Communicate with you;</li>
              <li>Screen our orders for potential risk or fraud; and</li>
              <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            </ul>
            <p>
              We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
            </p>
          </div>

          <div className="content-section">
            <h2>4. Sharing Your Personal Information</h2>
            <p>
              We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Google Analytics to help us understand how our customers use the Site—you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
            </p>
            <p>
              Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
          </div>

          <div className="content-section">
            <h2>5. Your Rights</h2>
            <p>
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
            </p>
          </div>

          <div className="content-section">
            <h2>6. Changes</h2>
            <p>
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
            </p>
          </div>

          <div className="content-section">
            <h2>7. Contact Us</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at joshuajeyphotography@gmail.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default PrivacyPolicyPage;