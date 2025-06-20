import React, { useEffect } from 'react'; // Import useEffect
import './SuccessPage.scss'; // Import the new SCSS file
import Nav from '../../components/Nav/Nav'; // Assuming you want Nav and Footer
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom'; // Import Link

function SuccessPage() {
  // Clear the cart from localStorage when the success page loads
  useEffect(() => {
    localStorage.removeItem('cart');
    // Optionally, you could also dispatch an action here if using a global state manager like Redux/Context API to update the cart state in the UI immediately across components.
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <Nav />
      <div className="nav-buffer"></div> {/* Add buffer if needed */}
      <div className="success-page"> {/* Apply the class */}
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your order is being processed.</p>
        <Link to="/home" className="success-page-button"> {/* Added Link */}
          Back to Home
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default SuccessPage