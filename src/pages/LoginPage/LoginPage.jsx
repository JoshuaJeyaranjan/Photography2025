import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import '../SignupPage/SignupPage.scss'; // Re-using the same styles

export default function LoginPage() {
  const [email,   setEmail]   = useState('');
  const [password,setPassword]= useState('');
  const [error,   setError]   = useState('');
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate('/');              // send them home on success
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="page-container">
      <Nav />
      <div className="nav-buffer"></div>
      <div className="auth-page">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <p className="redirect-link">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
