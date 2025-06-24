import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import Link
import { loadStripe } from "@stripe/stripe-js";
import "./PhotoPage.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

// Use environment variables for flexibility between dev/staging/prod
const API_BASE_URL = "https://photography-docker.onrender.com";
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  "pk_test_YOUR_STRIPE_PUBLISHABLE_KEY";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function PhotoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [cartStatus, setCartStatus] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(sizes[null]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState("");

  // Fetch photo details
  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        setPhoto(data); // ✅ Use the single object directly
      } catch (err) {
        console.error("Failed to fetch photo:", err);
        setError("Could not load photo details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  // Fetch sizes
  useEffect(() => {
    const fetchSizes = async () => {
      const res = await fetch(`${API_BASE_URL}/api/print/print-sizes`);
      const data = await res.json();
      setSizes(data);
      setSelectedSize(data[0]); // default
    };
    fetchSizes();
  }, []);

  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Match by image ID and print size ID to treat different sizes as unique items
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.print_size_id === item.print_size_id
    );
  
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        url: item.url,
        quantity: item.quantity,
        print_size_id: item.print_size_id, // ✅ backend requires this
        size: item.size,                   // ✅ UI display (e.g. "16x24")
        preview_url: item.preview_url || null, // optional preview image
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const handlePurchase = async () => {
    if (!photo) return;
    setPurchaseStatus("Processing...");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: {
              name: "Guest",
              email: "guest@example.com", // if you want to prompt for email later, replace this
            },
            items: [
              {
                id: photo.id,
                name: photo.title || `Print of ${photo.filename}`,
                price: photo.price || 40.0,
                url: photo.url,
                quantity: 1,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (!data.sessionId) throw new Error(data.error || "Missing sessionId");

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error("Stripe error:", error);
        setPurchaseStatus(`Payment failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Purchase failed:", err);
      setPurchaseStatus(`Error: ${err.message}`);
    }
  };

  // Status rendering
  if (isLoading)
    return <div className="photo-page-status">Loading photo...</div>;
  if (error)
    return (
      <div className="photo-page-status error">
        {error}
        <br />
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  if (!photo)
    return (
      <div className="photo-page-status">
        Photo not found.
        <br />
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );

  return (
    <>
      <Nav />
      <div className="nav-buffer"></div>
      <div className="photo-page">
        <div className="photo-page-container">
          <div className="photo-detail">
            <picture>
              <source srcSet={photo.url} type="image/avif" />
              <source
                srcSet={photo.url.replace(".avif", ".jpg")}
                type="image/jpeg"
              />
              <img
                src={photo.url.replace(".avif", ".jpg")}
                alt={photo.title || photo.filename || "Photography image"}
                className="photo-detail-image"
                loading="lazy"
              />
            </picture>

            <div className="photo-metadata">
              <div className="button-container">
                {/* <button onClick={handlePurchase} className="purchase-button">
                  Buy Print – ${photo.price || 40.0}
                </button> */}

                <div className="print-sizes">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`size-button ${
                        selectedSize?.id === size.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <img
                        src={size.preview_url}
                        alt={size.label}
                        className="preview-img"
                      />
                      <div>
                        {size.label} – ${parseFloat(size.price).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    addToCart({
                      id: photo.id,
                      name: photo.title || `Print of ${photo.filename}`,
                      price: parseFloat(selectedSize.price),
                      url: photo.url,
                      quantity: 1,
                      size: selectedSize.label,
                      print_size_id: selectedSize.id,
                    });
                    setCartMessage("Added to cart!");
                    setTimeout(() => setCartMessage(""), 3000); // Clear message after 3s
                  }}
                  className="purchase-button"
                >
                  Add to Cart
                </button>
                {selectedSize && (
                  <div className="selected-info">
                    <p>
                      <strong>Selected Size:</strong> {selectedSize.label}
                    </p>
                    <p>
                      <strong>Price:</strong> $
                      {parseFloat(selectedSize.price).toFixed(2)}
                    </p>
                  </div>
                )}

                <p className="purchase-status">{purchaseStatus}</p>
                {cartMessage && <p className="cart-message">{cartMessage}</p>}
                {cartMessage && ( // Conditionally render Checkout button when cartMessage is active
                  <Link
                    to="/cart"
                    className="purchase-button checkout-now-button"
                  >
                    Checkout Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PhotoPage;
