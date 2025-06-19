import React from 'react'
import { Link } from 'react-router-dom'
import './CartIcon.scss'


const CartIcon = () => {
  return (
    <>
    <Link to='/cart'>
    <img 
    className="cart-icon nav__link nav__link--ig nav__ig " 
    src="https://r2-image-proxy.r2-image-proxy.workers.dev/assets/cart.svg" 
    alt="Cart Icon" />
  
    </Link>
  

    </>
  )
}

export default CartIcon 