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

  console.group('🛒 Checkout Debug');
  console.log('Customer:', customer);
  console.log('Cart items:', cartItems);
  console.log('Stripe key present:', !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  console.groupEnd();

  setIsLoading(true);

  try {
    const response = await fetch(
      'https://photography-docker.onrender.com/api/stripe/create-checkout-session',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: cartItems,
        }),
      }
    );

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response body:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Server returned error');
    }

    if (!data.sessionId) {
      throw new Error('Missing sessionId from server');
    }

    const stripe = await window.Stripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  } catch (err) {
    console.error('❌ Checkout error:', err);
    setError(err.message);
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
