import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-copyright">
          <p>&copy; {currentYear} Joshua Jey Photography. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
