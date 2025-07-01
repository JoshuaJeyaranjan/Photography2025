import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./PhotoPage.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import ImageModal from "../../components/ImageModal/ImageModal";
import { useCart } from "../../context/CartContext.jsx";

const API_BASE_URL = "https://photography-docker.onrender.com";
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  "pk_test_YOUR_STRIPE_PUBLISHABLE_KEY";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function PhotoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [photo, setPhoto] = useState(null);
  const [cartStatus, setCartStatus] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState("");
  const clickTimer = useRef(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPhoto(data);
      } catch (err) {
        console.error("Failed to fetch photo:", err);
        setError("Could not load photo details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhoto();
  }, [id]);

  useEffect(() => {
    const fetchSizes = async () => {
      const res = await fetch(`${API_BASE_URL}/api/print/print-sizes`);
      const data = await res.json();
      setSizes(data);
      setSelectedSize(data[0] || null);
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    return () => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, []);

  const handlePurchase = async () => {
    if (!photo) return;
    setPurchaseStatus("Processing...");

    try {
      const res = await fetch(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: "Guest",
            email: "guest@example.com",
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
      });

      const data = await res.json();
      if (!data.sessionId) throw new Error(data.error || "Missing sessionId");

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (error) {
        console.error("Stripe error:", error);
        setPurchaseStatus(`Payment failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Purchase failed:", err);
      setPurchaseStatus(`Error: ${err.message}`);
    }
  };

  const handlePreviewSizeClick = (size) => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setModalImage(size.preview_url);
      setModalAlt(`Preview for ${size.label} print`);
    } else {
      clickTimer.current = setTimeout(() => {
        setSelectedSize(size);
        clickTimer.current = null;
      }, 250);
    }
  };

  if (isLoading) return <div className="photo-page-status">Loading photo...</div>;
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

  // Strip known extensions and rebuild the base URL
  const baseImageUrl = photo.url.replace(/\.(avif|webp|jpeg|jpg)$/, "");

  return (
    <>
      <Nav />
      <div className="nav-buffer" />
      <div className="photo-page">
        <div className="photo-page-container">
          <div className="photo-detail">
            <picture>
              <source srcSet={`${baseImageUrl}.avif`} type="image/avif" />
              <source srcSet={`${baseImageUrl}.webp`} type="image/webp" />
              <source srcSet={`${baseImageUrl}.jpg`} type="image/jpeg" />
              <img
                src={`${baseImageUrl}.jpg`}
                alt={photo.title || photo.filename || "Photography image"}
                className="photo-detail-image"
                loading="lazy"
                onClick={() => {
                  setModalImage(`${baseImageUrl}.jpg`);
                  setModalAlt(photo.title || photo.filename || "Photography image");
                }}
              />
            </picture>

            <div className="photo-metadata">
              <div className="purchase-container">
                <div className="size-selector">
                  <h3 className="selector-title">Select a Size</h3>
                  <div className="size-options">
                    {sizes.map((size) => (
                      <button
                        key={size.id}
                        className={`size-option ${
                          selectedSize?.id === size.id ? "selected" : ""
                        }`}
                        onClick={() => handlePreviewSizeClick(size)}
                        aria-label={`Select size ${size.label}. Double-click to enlarge.`}
                      >
                        <img
                          src={size.preview_url}
                          alt={`Preview for ${size.label} print`}
                          className="size-preview-image"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {selectedSize && (
                  <div className="selected-size-info">
                    <span>{selectedSize.label}</span>
                    <span>${parseFloat(selectedSize.price).toFixed(2)}</span>
                  </div>
                )}

                <div className="action-area">
                  <button
                    onClick={() => {
                      addToCart({
                        id: photo.id,
                        name: photo.title || `Print of ${photo.filename}`,
                        price: parseFloat(selectedSize.price),
                        url: `${baseImageUrl}.jpg`,
                        quantity: 1,
                        size: selectedSize.label,
                        print_size_id: selectedSize.id,
                      });
                      setCartMessage("Added to cart!");
                      setTimeout(() => setCartMessage(""), 10000);
                    }}
                    className="add-to-cart-button"
                    disabled={!selectedSize}
                  >
                    Add to Cart
                  </button>
                  {cartMessage && (
                    <Link to="/cart" className="checkout-now-button">
                      Checkout Now
                    </Link>
                  )}
                </div>
                {cartMessage && <p className="cart-message">{cartMessage}</p>}
                <p className="purchase-status">{purchaseStatus}</p>
              </div>
              <h3 className="selector-disclaimer">*frame not included with purchase</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ImageModal
        src={modalImage}
        alt={modalAlt}
        onClose={() => setModalImage(null)}
      />
    </>
  );
}

export default PhotoPage;