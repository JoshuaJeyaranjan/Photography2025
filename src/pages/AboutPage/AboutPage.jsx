import React from 'react'
import './AboutPage.scss'
import Nav from '../../components/Nav/Nav'

function AboutPage() {
  return (
    <div className="about-page">
      <Nav />
      <div className="about-content">
        <div className="about-header">
          <h1>About Me</h1>
          <div className="profile-image-container">
            <img className='about-image' src="public/me.jpg" alt="picture of photographer" />
          </div>
        </div>

        <section className="about-section">
          <h2>Portrait Photography Expertise</h2>
          <p>
            As an experienced portrait photographer, I specialize in capturing the essence of individuals through both creative and classic approaches. My work combines technical excellence with artistic vision to create portraits that tell unique stories.
          </p>
        </section>

        <section className="about-section">
          <h2>Creative Vision</h2>
          <p>
            I embrace unorthodox and creative approaches to portrait photography, pushing boundaries while maintaining professional quality. Whether you're looking for something avant-garde or a timeless classic portrait, I bring your vision to life with attention to detail and artistic flair.
          </p>
        </section>

        <section className="about-section impact-section">
          <h2>Making an Impact</h2>
          <p>
            Beyond photography, I'm committed to making a positive difference in our community. 10% of all profits from my photography services are donated to homeless charities in Toronto, supporting those in need while pursuing my passion for capturing beautiful moments.
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutPage