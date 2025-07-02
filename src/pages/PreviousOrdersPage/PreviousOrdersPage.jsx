import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./PreviousOrdersPage.scss";

const PreviousOrdersPage = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://photography-docker.onrender.com/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        // Normalize amounts to numbers safely
        const normalized = data.map((order) => ({
          ...order,
          total_amount: Number(order.total_amount),
          items: order.items.map((item) => ({
            ...item,
            price_at_purchase: Number(item.price_at_purchase),
            quantity: Number(item.quantity),
          })),
        }));

        setOrders(normalized);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if (loading) {
    return <div className="page-loader">Loading order history...</div>;
  }

  return (
    <>
      <Nav />
      <div className="nav-buffer" />
      <div className="order-history-page">
        <h1 className="italiana-regular">Your Order History</h1>

        {orders.length === 0 ? (
          <p className="empty-message">You haven't placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div className="order-card content-container" key={order.id}>
              <div className="order-header">
                <h2>Order #{order.id}</h2>
                <p className="order-date">{order.formatted_date}</p>
                <p>
                  Status: <strong>{order.order_status}</strong>
                </p>
                <p>
                  Total: ${order.total_amount.toFixed(2)}
                </p>
              </div>

              <div className="order-items content-section">
                {order.items.map((item, idx) => (
                  <div className="order-item" key={idx}>
                    <div className="item-image">
                      <img
                        src={item.preview_url}
                        alt={item.title || "Photo Print"}
                        loading="lazy"
                      />
                    </div>

                    <div className="item-details container">
                      <h3 className="item-title">{item.title}</h3>
                      <p>
                        Size: <strong>{item.print_size_label}</strong>
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>
                        Unit Price: ${item.price_at_purchase.toFixed(2)}
                      </p>
                      <p>
                        Subtotal: $
                        {(item.price_at_purchase * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default PreviousOrdersPage;