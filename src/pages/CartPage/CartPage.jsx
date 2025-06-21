import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [checkoutError, setCheckoutError] = useState(""); // State for checkout-specific errors
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250); // Loader visible for 250ms

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
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
  
    if (!customer.name || !customer.email) {
      console.warn("Missing customer details:", customer);
      setCheckoutError("Please enter your name and email before continuing to payment.");
      return;
    }
  
    setCheckoutError(""); // Clear any previous error
  
    console.log("🛒 Preparing checkout with:");
    console.log("Customer:", customer);
    console.log("Cart items:", cart);
  
    try {
      const response = await fetch(
        "https://photography-docker.onrender.com/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customer, items: cart }),
        }
      );
  
      const data = await response.json();
      console.log("🎟️ Stripe session response:", data);
  
      if (!data.sessionId) throw new Error(data.error || "Missing sessionId");
  
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      console.log("🚀 Redirecting to Stripe with session ID:", data.sessionId);
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error("❌ Checkout error:", err);
      setCheckoutError(err.message || "An unexpected error occurred during checkout.");
    }
  };

  return (
    <>
          {isLoading && (
        <div className="page-loader">
          {/* You can put a simple spinner or a subtle logo here if desired */}
          {/* For now, it's just a full-screen overlay */}
        </div>
      )}
      <Nav />
      <div className="nav-buffer"></div>
      <div className="cart-page">
        <h1 className="italiana-regular">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart-container">
            <p className="empty-cart">Your cart is empty.</p>
            <Link to="/home" className="cart-page-button back-to-home-button">
              Back to Home
            </Link>
          </div>
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
                    {/* <h2>{item.name}</h2> */}
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
                      <span className="quantity">{item.quantity}</span>
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

            <div className="customer-info">
              <input
              className="input"
                type="text"
                placeholder="Name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                required
              />
              <input
              className="input"
                type="email"
                placeholder="Email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                required
              />
            </div>
              {checkoutError && <p className="checkout-error-message">{checkoutError}</p>}
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
