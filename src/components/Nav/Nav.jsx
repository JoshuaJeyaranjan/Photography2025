import React, { useState } from "react";
import "./Nav.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import ThemeToggle from "../ThemeToggle/ThemeToggle";


function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close the menu, useful for link clicks
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/"); // Redirect home after logout
  };

  const BUCKET_URL = import.meta.env.VITE_BUCKET_URL
  
  return (
    <nav className="nav">
      {/* Left Section */}
      <div className="nav__section nav__section--left">
        <Link className="nav__logo-link" to="/portrait" onClick={closeMobileMenu}>
          <h1 className="nav__logo italiana-regular">JJ</h1>
        </Link>
        <ThemeToggle />
      </div>

      {/* Center Section */}
      <div className="nav__section nav__section--center">
        <Link to="/portrait" className="nav__main-link" onClick={closeMobileMenu}>
          <div className="nav__text-wrapper">
            <h2 className="nav__text poppins-light">Joshua Jey</h2>
            <h1 className="nav__title italiana-regular">Photography</h1>
          </div>
        </Link>
        
      </div>

      {/* Right Section */}
      <div className="nav__section nav__section--right">
        {/* Hamburger Icon - visible only on mobile via CSS */}
        <button className="nav__hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links Container - gets --open class when menu is active */}
        <div className={`nav__links ${isMobileMenuOpen ? "nav__links--open" : ""}`}>
          <NavLink to="/contact" className="nav__link" onClick={closeMobileMenu}>
            Contact
          </NavLink>
          <NavLink to="/about" className="nav__link " onClick={closeMobileMenu}>
            About
          </NavLink>
          <NavLink to="/prints" className="nav__link" onClick={closeMobileMenu}>
            Prints
          </NavLink>
          {user ? (
            <button onClick={handleLogout} className="nav__link nav__link--button">
              Logout
            </button>
          ) : (
            // Corrected the invalid nested button and simplified the link
            <Link to="/login" className="nav__link nav__link--button" onClick={closeMobileMenu}>
              Login
            </Link>
          )}

          {user && user.id === 1 && (
            <NavLink to="/admin" className="nav__link" onClick={closeMobileMenu}>
              Admin
            </NavLink>
          )}

          <Link to="/cart" className="nav__link nav__link--icon nav__cart-link" onClick={closeMobileMenu}>
            <img
              src={`${BUCKET_URL}/assets/cart.svg`}
              alt="Cart"
              className="nav__icon" // Standardized class name
            />
            {cartItemCount > 0 && (
              <span className="nav__cart-badge">{cartItemCount}</span>
            )}
          </Link>
          
          <Link
            to="https://www.instagram.com/joshuajeyphotography"
            className="nav__link nav__link--icon"
            onClick={closeMobileMenu}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${BUCKET_URL}/assets/instagram.svg`}
              alt="Instagram"
              className="nav__icon" // Standardized class name
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
