import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import './SignupPage.scss';

export default function SignupPage() {
  // State hooks
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const { signup }            = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // now passing name as well
      await signup({ name, email, password });
      navigate('/'); // or wherever you want to redirect
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="page-container">
      <Nav />
      <div className="nav-buffer"></div>
      <div className="auth-page">
        <h1>Create Account</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="redirect-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
