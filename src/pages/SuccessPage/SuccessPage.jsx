import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './SuccessPage.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

const API_BASE_URL = 'https://photography-docker.onrender.com/api';

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No payment session ID found. Please contact support if you have been charged.");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stripe/order/by-session/${sessionId}`);
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Could not fetch order details.');
        }
        const data = await response.json();
        setOrderData(data);
        clearCart(); // Clear the cart only on successful order fetch
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId, clearCart]);

  const renderContent = () => {
    if (loading) {
      return <p>Loading your order details...</p>;
    }
    if (error) {
      return <p className="error-message">Error: {error}</p>;
    }
    if (!orderData) {
      return <p>Order details could not be loaded.</p>;
    }

    const { order, items } = orderData;
    const subtotal = items.reduce((acc, item) => acc + (item.quantity * Number(item.price_at_purchase)), 0);

    return (
      <>
        <h1>Thank you for your order, {order.customer_name}!</h1>
        <p>A confirmation and invoice have been sent to {order.customer_email}.</p>
        <p className="order-id">Your Order ID is: <strong>{order.id}</strong></p>
        
        <div className="purchased-items-summary">
          <h2>Items Purchased</h2>
          <ul className="item-list">
            {items.map(item => (
              <li key={item.id} className="purchased-item">
                <span className="item-name">{item.quantity} x {item.item_name} ({item.item_size})</span>
                <span className="item-price">${Number(item.price_at_purchase).toFixed(2)} each</span>
              </li>
            ))}
          </ul>
          <div className="totals-summary">
            <div className="summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>${Number(order.shipping_amount / 100).toFixed(2)}</span>
            </div>
            <div className="summary-line grand-total">
              <strong>Total</strong>
              <strong>${Number(order.total_amount / 100).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Nav />
      <div className="nav-buffer"></div>
      <div className="success-page">
        {renderContent()}
        <Link to="/prints" className="success-page-button">
          Continue Shopping
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default SuccessPage;