import React from 'react';
import './AboutPage.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BacktoTop/BacktoTop';

const BUCKET_URL = import.meta.env.VITE_BUCKET_URL

function AboutPage() {
  return (
    <>
      <Nav />
      <main className="about-page">
        <div className="about-content">
          <div className="about-header">
            <h1 className='italiana-regular'>About Me</h1>
            <div className="profile-image-container">
              <img
                className="about-image"
                src={`${BUCKET_URL}/me/me.avif`}
                alt="picture of photographer"
              />
            </div>
          </div>

          <div className="about-section ">
            <h2 className='poppins-light'>Portrait Photography Expertise</h2>
            <p className='poppins-light'>
              As an experienced portrait photographer, I specialize in capturing the essence of individuals through both creative and classic approaches. My work combines technical excellence with artistic vision to create portraits that tell unique stories.
            </p>
          </div>

          <div className="about-section">
            <h2 className='poppins-light'>Creative Vision</h2>
            <p className='poppins-light'>
              I embrace unorthodox and creative approaches to portrait photography, pushing boundaries while maintaining professional quality. Whether you're looking for something avant-garde or a timeless classic portrait, I bring your vision to life with attention to detail and artistic flair.
            </p>
          </div>

          <div className="about-section impact-section">
            <h2 className='poppins-light'>Making an Impact</h2>
            <p className='poppins-light'>
              Beyond photography, I'm committed to making a positive difference in our community. 10% of all profits from my photography services are donated to homeless charities in Toronto, supporting those in need while pursuing my passion for capturing beautiful moments.
            </p>
          </div>
        </div>
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}

export default AboutPage;
