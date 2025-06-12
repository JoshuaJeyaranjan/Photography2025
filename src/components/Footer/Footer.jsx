import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      Footer
      <Link to="/">Home</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/portrait">Portrait</Link>
      <Link to="/street">Street</Link>
    </div>
  );
}

export default Footer;
