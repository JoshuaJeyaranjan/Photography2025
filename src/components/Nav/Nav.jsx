import React, { useState } from "react";
import "./Nav.scss";
import { NavLink, Link } from "react-router-dom";
import CartIcon from "../CartIcon/CartIcon";


function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close the menu, useful for link clicks
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  return (
    <div className="nav">
      <Link className="nav__logo-link" to="/portrait">
<h1 className="nav__logo">JJ</h1>

      </Link>
      <Link to="/portrait" className="nav__main-link">
        <div className="nav__text">
          <h2 className="nav__text">Joshua Jey</h2>
          <h1>Photography</h1>
        </div>
      </Link>

      {/* Hamburger Icon - visible only on mobile via CSS */}
      <button className="nav__hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Links Container - gets --open class when menu is active */}
      <div className={`nav__links ${isMobileMenuOpen ? "nav__links--open" : ""}`}>
        {/* <NavLink to='/'>Home</NavLink> */}
        <NavLink to="/contact" className="nav__link" onClick={closeMobileMenu}>
          Contact
        </NavLink>
        {/* <NavLink to='/portrait'>Portrait</NavLink> */}
        {/* <NavLink to='/street'>Street</NavLink> */}
        <NavLink to="/about" className="nav__link" onClick={closeMobileMenu}>
          About
        </NavLink>
        <NavLink to="/prints" className="nav__link" onClick={closeMobileMenu}>
          Prints
        </NavLink>
        <Link
          to="/cart"
          className="nav__link nav__link--ig" // Add nav__link for consistent mobile styling
          onClick={closeMobileMenu}
          target="_blank" // Good practice for external links
          rel="noopener noreferrer" // Security for target="_blank"
        >
          <img
            src="https://r2-image-proxy.r2-image-proxy.workers.dev/assets/cart.svg"
            alt="Cart"
            className="nav__ig"
          />
        </Link>
        
        {/* Instagram Link - also part of the mobile menu */}
        <Link
          to="https://www.instagram.com/joshuajeyphotography"
          className="nav__link nav__link--ig" // Add nav__link for consistent mobile styling
          onClick={closeMobileMenu}
          target="_blank" // Good practice for external links
          rel="noopener noreferrer" // Security for target="_blank"
        >
          <img
            src="https://r2-image-proxy.r2-image-proxy.workers.dev/assets/instagram.svg"
            alt="Instagram"
            className="nav__ig"
          />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
