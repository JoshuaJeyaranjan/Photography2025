import React, { useState } from 'react';
import './CheckoutPage.scss'
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

function CheckoutPage() {
  const [cartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  const [customer, setCustomer] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!cartItems.length) {
      setError('Your cart is empty.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://photography2025server.onrender.com/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items: cartItems })
      });

      const data = await response.json();

      if (!data.sessionId) throw new Error(data.error || 'Missing sessionId');

      const stripe = await window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      setError(err.message);
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="checkout-page">
        <h1>Checkout</h1>
        <input
          type="text"
          placeholder="Name"
          value={customer.name}
          onChange={e => setCustomer({ ...customer, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={e => setCustomer({ ...customer, email: e.target.value })}
          required
        />

        <button onClick={handleCheckout} disabled={isLoading || !customer.name || !customer.email}>
          {isLoading ? 'Redirecting...' : 'Continue to Payment'}
        </button>

        {error && <p className="error">{error}</p>}
      </div>
      <Footer />
    </>
  );
}

export default CheckoutPage;
