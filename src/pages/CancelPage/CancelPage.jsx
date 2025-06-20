import React from 'react'
import './CancelPage.scss' // Import the new SCSS file
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'; // Import Link

function CancelPage() {
  return (
    <>
      <Nav />
      <div className="nav-buffer"></div> {/* Add buffer if needed */}
      <div className="cancel-page"> {/* Apply the class */}
        <h1>Payment Cancelled</h1>
        <p>Your payment was not completed. Your cart has not been changed.</p>
        <p>If you encountered an issue, please try again or contact support.</p>
        <Link to="/home" className="cancel-page-button"> {/* Added Link */}
          Back to Home
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default CancelPage