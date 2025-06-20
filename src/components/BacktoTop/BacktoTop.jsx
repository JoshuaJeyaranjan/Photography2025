import React, { useState, useEffect } from "react";
import "./BacktoTop.scss"; 

const BUCKET_URL = import.meta.env.VITE_BUCKET_URL

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Adjust 300 to your preference
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // Add 'visible' class to the container based on the state.
    // The button is always in the DOM; CSS handles visibility and transitions.
    <div className={`back-to-top ${isVisible ? "visible" : ""}`}>
      <button className="button" onClick={scrollToTop} title="Go to top">
        <img 
        className="back-to-top__icon" 
        src={`${BUCKET_URL}/assets/up.svg`} 
        alt="back to top arrow"
        
         />
      </button>
    </div>
  );
};

export default BackToTop;