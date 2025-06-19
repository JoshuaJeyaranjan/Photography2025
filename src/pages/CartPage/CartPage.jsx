import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const changeQuantity = (id, delta) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateCart(newCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    try {
      const response = await fetch("https://photography2025server.onrender.com/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: "Guest", email: "guest@example.com" },
          items: cart,
        }),
      });
  
      const data = await response.json();
      console.log("Stripe session response:", data);
  
      if (!data.sessionId) throw new Error(data.error || "Missing sessionId");
  
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error("Checkout error:", err);
    }
    console.log("Sending to Stripe:", {
        customer: { name: "Guest", email: "guest@example.com" },
        items: cart
      });
      
  };

  return (
    <>
      <Nav />
      <div className="nav-buffer"></div>
      <div className="cart-page">
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={
                      item.url
                        ? item.url.replace(".avif", ".jpg")
                        : "/fallback.jpg"
                    }
                    alt={item.name || "Print image"}
                    className="cart-image"
                  />

                  <div className="cart-details">
                    <h2>{item.name}</h2>
                    <p>
                      $
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : "N/A"}
                    </p>
                    <div className="quantity-controls">
                      <button onClick={() => changeQuantity(item.id, -1)}>
                        -
                      </button>
                      <span className="quantity" >{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Cart Total: ${totalPrice.toFixed(2)}</h2>
              <button onClick={handleCheckout} className="checkout-button">
                Continue to Payment
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
