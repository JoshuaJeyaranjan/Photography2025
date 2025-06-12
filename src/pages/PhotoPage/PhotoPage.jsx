import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './PhotoPage.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

// Replace with your actual Stripe publishable key (use environment variables for this in a real app)
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function PhotoPage() {
  const { id } = useParams(); // Gets the photo ID from the URL
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // In a real app, you'd fetch a single photo's details: /api/gallery/${id}
    // For now, let's assume we fetch all and filter, or you adapt your backend.
    // This is NOT efficient for many images but works for demonstration.
    // A better approach is a dedicated backend endpoint: fetch(`/api/images/details/${id}`)
    fetch(`/api/gallery`) // Fetch all, then find by ID
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const foundPhoto = data.find(p => p.id.toString() === id);
        if (foundPhoto) {
          setPhoto(foundPhoto);
        } else {
          setError('Photo not found.');
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch photo details:", err);
        setError('Could not load photo details.');
        setIsLoading(false);
      });
  }, [id]);

  const handlePurchase = async () => {
    if (!photo) return;
    setPurchaseStatus('Processing...');

    // Example price - you'd likely get this from photo data or define it
    const itemPrice = photo.price || 25.00; // Default price if not in photo data

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: photo.id,
          itemName: photo.title || `Print of ${photo.filename}`,
          itemPrice: itemPrice, // Send price in dollars/euros etc.
          // You might want to add image URL for Stripe checkout page:
          // itemImage: photo.url 
        }),
      });
      if (!response.ok) throw new Error('Failed to create Stripe session');
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Stripe redirect error:", error);
        setPurchaseStatus(`Payment error: ${error.message}`);
      }
    } catch (err) {
      console.error("Purchase error:", err);
      setPurchaseStatus(`Error: ${err.message}. Please try again.`);
    }
  };

  if (isLoading) return <div className="photo-page-status">Loading photo...</div>;
  if (error) return <div className="photo-page-status error">{error} <button onClick={() => navigate(-1)}>Go Back</button></div>;
  if (!photo) return <div className="photo-page-status">Photo not found. <button onClick={() => navigate(-1)}>Go Back</button></div>;

  return (
    <>
    <Nav />
    <div className="photo-page-container">
      
      <div className="photo-detail">
        <img src={photo.url} alt={photo.title || photo.filename} className="photo-detail-image" />
        {/* <div className="photo-info">
          <h1>{photo.title || 'Untitled'}</h1>
          <p className="photo-description">{photo.description || 'No description available.'}</p>
          <p className="photo-category">Category: {photo.category}</p>
          
          <button onClick={handlePurchase} className="purchase-button" disabled={purchaseStatus === 'Processing...'}>
            {purchaseStatus === 'Processing...' ? 'Processing...' : `Purchase Print ($${(photo.price || 25.00).toFixed(2)})`}
          </button>
          {purchaseStatus && purchaseStatus !== 'Processing...' && <p className="purchase-status">{purchaseStatus}</p>}
        </div> */}
      </div>
      
    </div>
    </>
  );
}

export default PhotoPage;