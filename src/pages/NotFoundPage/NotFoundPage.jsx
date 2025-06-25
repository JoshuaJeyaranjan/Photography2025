import React from 'react'
import './NotFoundPage.scss'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <>
      <Nav />
      <div className="nav-buffer"></div> {/* Assuming you have this for nav spacing */}
      <div className="not-found-page">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
        <p className="not-found-suggestion">It might have been moved or deleted.</p>
        <Link to="/prints" className="not-found-button">
          Go to Prints Gallery
        </Link>
        <Link to="/" className="not-found-link">Or return to Home</Link>
      </div>
      <Footer />
    </>
  )
}

export default NotFoundPage