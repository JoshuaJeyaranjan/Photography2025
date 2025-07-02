import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link className="poppins-light" to="/">Home</Link>
          <Link className="poppins-light" to="/contact">Contact</Link>
          
          <Link className="poppins-light" to="/faq">FAQ</Link>
          <Link className="poppins-light" to="/customer-care">Care</Link>
          
          <br className="break" />
      <Link className="poppins-light" to="/privacy-policy">Privacy Policy</Link>
          <Link className="poppins-light" to="/terms">Terms & Conditions</Link>
        </div>
        <div className="footer-copyright poppins-light">
          <p>&copy; {currentYear} Joshua Jey Photography. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
