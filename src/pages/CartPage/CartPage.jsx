import React, { useEffect, useState, useRef } from "react";
import "./CartPage.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Import useCart
import { useAuth } from "../../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

const shippingOptions = [
  {
    id: "shr_1RgXBgEydtOSnncEyjMd6iVx",
    amount: 900,
    label: "Standard Shipping - $9.00",
  },
  {
    id: "shr_1RdboDEydtOSnncE8l44b0Qw",
    amount: 3000,
    label: "Express Shipping - $30.00",
  },
  {
    id: "shr_1RdbrtEydtOSnncE4YETfhK8",
    amount: 4000,
    label: "International Shipping - $40.00",
  },
];

const CartPage = () => {
  const { cart, removeFromCart, changeItemQuantity } = useCart(); // Use cart from context
  const { user } = useAuth(); // Get user from auth context
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [checkoutError, setCheckoutError] = useState(""); // State for checkout-specific errors
  const [isLoading, setIsLoading] = useState(true);
  const [shippingRate, setShippingRate] = useState(shippingOptions[0]); // Default to Standard Shipping
  const [isShippingDropdownOpen, setIsShippingDropdownOpen] = useState(false);
  const shippingDropdownRef = useRef(null);

  const TAX_RATE = 0.13;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = shippingRate ? shippingRate.amount / 100 : 0;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250); // Loader visible for 250ms

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
  // Load cart from localStorage on mount
  // Pre-fill customer info if user is logged in
  useEffect(() => {
    if (user) {
      setCustomer({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  // Effect to close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shippingDropdownRef.current &&
        !shippingDropdownRef.current.contains(event.target)
      ) {
        setIsShippingDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!customer.name || !customer.email) {
      console.warn("Missing customer details:", customer);
      setCheckoutError(
        "Please enter your name and email before continuing to payment."
      );
      return;
    }

    setCheckoutError(""); // Clear any previous error

    try {
      const response = await fetch(
        "https://photography-docker.onrender.com/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer,
            items: cart,
            shipping_rate: shippingRate?.id,
            tax_rate: TAX_RATE,
          }),
        }
      );

      const data = await response.json();

      if (!data.sessionId) throw new Error(data.error || "Missing sessionId");

      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error("❌ Checkout error:", err);
      setCheckoutError(
        err.message || "An unexpected error occurred during checkout."
      );
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
                    <h2>{item.size}</h2>
                    <p>
                      $
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : "N/A"}
                    </p>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          changeItemQuantity(item.id, item.print_size_id, -1)
                        }
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() =>
                          changeItemQuantity(item.id, item.print_size_id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.id, item.print_size_id)
                      }
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
                {/* Custom Select Dropdown */}
                <div className="custom-select" ref={shippingDropdownRef}>
                  <div
                    className="select-selected"
                    onClick={() =>
                      setIsShippingDropdownOpen(!isShippingDropdownOpen)
                    }
                    role="button"
                    aria-haspopup="listbox"
                    aria-expanded={isShippingDropdownOpen}
                  >
                    {shippingRate ? shippingRate.label : "Select Shipping"}
                  </div>
                  {isShippingDropdownOpen && (
                    <div className="select-items" role="listbox">
                      {shippingOptions.map((option) => (
                        <div
                          key={option.id}
                          className="select-item"
                          onClick={() => {
                            setShippingRate(option);
                            setIsShippingDropdownOpen(false);
                          }}
                          role="option"
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {checkoutError && (
                <p className="checkout-error-message">{checkoutError}</p>
              )}
              <div className="cart-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row grand-total">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>
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
