import React, { useState, useEffect } from "react";
import "./BackToTop.scss"; // We'll create this file next

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
    // The image is always in the DOM; CSS handles visibility and transitions.
    <div className={`back-to-top ${isVisible ? "visible" : ""}`}>
      <img
        src="https://r2-image-proxy.r2-image-proxy.workers.dev/assets/up.svg"
        alt="Back to top"
        className="up-arrow-icon" // Changed class name for clarity
        onClick={scrollToTop}
        title="Go to top"
      />
    </div>
  );
};

export default BackToTop;