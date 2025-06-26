import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../components/AdminNav/AdminNav';
import './AdminOrdersPage.scss';

const API_URL = 'https://photography-docker.onrender.com';

function AdminOrdersPage() {
  const { user, loading: authLoading, token } = useAuth(); // Get token from AuthContext
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    // This effect runs after the auth state is confirmed
    if (!authLoading) {
      if (!user || !user.is_admin) {
        navigate('/login'); // Redirect non-admins to login
      }
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && user.is_admin && token) {
      const fetchOrders = async () => {
        try {
          console.log('AdminOrdersPage: Attempting to fetch orders...');
          // Assumes an endpoint /api/admin/orders exists and is protected
          const response = await fetch(`${API_URL}/api/stripe/orders`, {
            headers: {
              'Authorization': `Bearer ${token}` // Include the JWT token
            }
          });
          console.log('AdminOrdersPage: Response status:', response.status);
          console.log('AdminOrdersPage: Response OK:', response.ok);
          if (!response.ok) {
            const errorBody = await response.text(); // Get the raw response body for debugging
            console.error('AdminOrdersPage: Server responded with error:', errorBody);
            throw new Error('Failed to fetch orders.');
          }
          const data = await response.json();
          setOrders(data);
          console.log('Fetched orders:', data);
        } catch (err) {
          setError(err.message);
          console.error('AdminOrdersPage: Error during fetch:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else if (!authLoading) { // If not loading auth, and condition not met, ensure loading is false
      setLoading(false);
    }
  }, [user, token, authLoading]); // Added token and authLoading to dependency array

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (authLoading || loading) {
    return <div className="admin-loading-fullscreen">Loading Orders...</div>;
  }

  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-main-content">
        <h1>Purchase History</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map(({ order, items }) => (
              <div key={order.id} className="order-card">
                <div className="order-summary" onClick={() => toggleOrderDetails(order.id)}>
                  <div className="summary-item"><strong>Order ID</strong><span>{order.id}</span></div>
                  <div className="summary-item"><strong>Customer</strong><span>{order.customer_name}</span></div>
                  <div className="summary-item"><strong>Date</strong><span>{new Date(order.created_at).toLocaleDateString()}</span></div>
                  <div className="summary-item"><strong>Total</strong><span>${Number(order.total_amount).toFixed(2)}</span></div>
                  <div className="summary-item-toggle"><span>{expandedOrderId === order.id ? '▲' : '▼'}</span></div>
                </div>
                {expandedOrderId === order.id && (
                  <div className="order-details">
                    <h4>Items Purchased</h4>
                    <ul>
                      {items.map(item => (
                        <li key={item.id}>
                          {item.quantity} x {item.item_name} - @ ${Number(item.price_at_purchase).toFixed(2)} each
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminOrdersPage;