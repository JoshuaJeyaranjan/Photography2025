import React from 'react'
import { Link } from 'react-router-dom'
import './CartIcon.scss'

const BUCKET_URL = process.meta.env.VITE_BUCKET_URL


const CartIcon = () => {
  return (
    <>
    <Link to='/cart'>
    <img 
    className="cart-icon nav__link nav__link--ig nav__ig " 
    src={`${BUCKET_URL}/assets/cart.svg`} 
    alt="Cart Icon" />
  
    </Link>
  

    </>
  )
}

export default CartIcon 