import React from "react";
import "./Nav.scss";
import { NavLink, Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav">
<Link to='/portrait'>
  <img src="https://r2-image-proxy.r2-image-proxy.workers.dev/logo/cameraIcon2.svg" alt="Camera Icon" className="nav__logo" />
</Link>
      <Link to="/portrait" className="nav__text-link">
        <div className="nav__text">
          <h2>Joshua Jey</h2>
          <h1>Photography</h1>
        </div>
      </Link>

      <div className="nav__links">
        {/* <NavLink to='/'>Home</NavLink> */}
        <NavLink to="/contact" className="nav__link">
          Contact
        </NavLink>
        {/* <NavLink to='/portrait'>Portrait</NavLink> */}
        {/* <NavLink to='/street'>Street</NavLink> */}
        <NavLink to="/about" className="nav__link">
          About
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
