import React from 'react'
import './Nav.scss'
import { NavLink, Link } from "react-router-dom";

function Nav() {
  return (
    <div className='nav'>Joshua Jey Photography
        <div className='nav__links'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
            <NavLink to='/portrait'>Portrait</NavLink>
            <NavLink to='/street'>Street</NavLink>
        </div>
    </div>
  )
}

export default Nav