import React from 'react';
import './TermsPage.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BacktoTop/BacktoTop';

function TermsPage() {
  return (
    <>
      <Nav />
      <main className="content-page-layout">
        <div className="content-container">
          <div className="content-header">
            <h1>Terms and Conditions</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="content-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Joshua Jey Photography. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use the website if you do not agree to all of the terms and conditions stated on this page.
            </p>
          </div>

          <div className="content-section">
            <h2>2. Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these Terms, the photographer and/or its licensors own all the intellectual property rights and materials contained in this website. All photographs are the property of the photographer. You are granted a limited license only for purposes of viewing the material contained on this website.
            </p>
          </div>

          <div className="content-section">
            <h2>3. Restrictions</h2>
            <p>
              You are specifically restricted from all of the following:
            </p>
            <ul>
              <li>publishing any website material in any other media;</li>
              <li>selling, sublicensing and/or otherwise commercializing any website material;</li>
              <li>publicly performing and/or showing any website material without prior consent;</li>
              <li>using this website in any way that is or may be damaging to this website;</li>
              <li>using this website in any way that impacts user access to this website;</li>
              <li>using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity;</li>
              <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this website.</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>4. No warranties</h2>
            <p>
              This website is provided "as is," with all faults, and the photographer expresses no representations or warranties, of any kind related to this website or the materials contained on this website.
            </p>
          </div>

          <div className="content-section">
            <h2>5. Limitation of liability</h2>
            <p>
              In no event shall the photographer, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. The photographer, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
            </p>
          </div>

          <div className="content-section">
            <h2>6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of the Province of Ontario, Canada, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Toronto for the resolution of any disputes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default TermsPage;