import React, { useState, useEffect } from 'react';
import './AdminPage.scss';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminNav from '../../components/AdminNav/AdminNav';

function AdminPage() {
  const { user, login, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // If already logged in as admin, fetch content
    if (user && user.id === 1) {
    } else if (user) {
      // If logged in as a non-admin, redirect to home
      navigate('/');
    }
  }, [user, navigate]); // Added user and navigate to dependency array

  if (authLoading) {
    // Prevents flicker while auth state is being determined
    return (
      <div className="admin-loading-fullscreen">Loading Admin Panel...</div>
    );
  }

  if (!user) {
    return (
      <div className="admin-login">
        <h1>Admin Login</h1>
        {loginError && <p className="error">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  if (user.id !== 1) return null; // Redirect handled by useEffect

  // Admin is logged in and authorized, display dashboard content
  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-main-content">
      <div className="admin-dashboard">
      <h1>Welcome, Admin!</h1>
      <p>This is your central hub for managing the website.</p>

        <section className="admin-actions">
            <h2>Quick Actions</h2>
            <Link to="/admin/orders" className="admin-action-button">
              View All Orders
            </Link>
            {/* Add other quick actions here if needed */}
          </section>
        </div>
      </main>
    </div>
  );
}


export default AdminPage;