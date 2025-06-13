import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './PhotoPage.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

// Use environment variables for flexibility between dev/staging/prod
const API_BASE_URL = 'https://photography2025server.onrender.com'
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function PhotoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState('');

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
        setError('Could not load photo details.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPhoto();
  }, [id]);
  

  const handlePurchase = async () => {
    if (!photo) return;
    setPurchaseStatus('Processing...');

    try {
      const response = await fetch(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: photo.id,
          itemName: photo.title || `Print of ${photo.filename}`,
          itemPrice: photo.price || 25.00,
        }),
      });

      if (!response.ok) throw new Error('Stripe session creation failed');

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

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
  if (isLoading) return <div className="photo-page-status">Loading photo...</div>;
  if (error) return (
    <div className="photo-page-status error">
      {error}
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
  if (!photo) return (
    <div className="photo-page-status">
      Photo not found.
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );

  return (
    <>
      <Nav />
      <div className="photo-page-container">
        <div className="photo-detail">
          <img
            src={photo.url}
            alt={photo.title || photo.filename}
            className="photo-detail-image"
          />
          <div className="photo-metadata">
            {/* <h2>{photo.title || 'Untitled'}</h2> */}
            {/* <p className="photo-description">{photo.description || 'No description provided.'}</p> */}
            {/* Uncomment below to enable Stripe purchase */}
            {/*
            <button onClick={handlePurchase} className="purchase-button">
              Buy Print – ${photo.price || 25.00}
            </button>
            <p className="purchase-status">{purchaseStatus}</p>
            */}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default PhotoPage;
