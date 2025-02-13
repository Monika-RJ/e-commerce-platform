// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redirect to home page after successful login
    } catch {
      setError('Login failed');
    }
  };

  const checkEmail = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/check-email`, { email });
      if (!response.data.exists) {
        setError('Email not registered. Redirecting to register page...');
        setTimeout(() => {
          navigate('/register');
        }, 2000); // Redirect to register page after 2 seconds
      } else {
        setError('');
      }
    } catch (err) {
      console.error('Error checking email:', err);
      setError('Error checking email');
    }
  };

  return (
    <div className={styles['login-body']}>
      <div className={styles['login-container']}>
        <h2 className={styles['login-title']}>Login</h2>
        {error && <p className={styles['login-error']}>{error}</p>}
        <form onSubmit={handleLogin} className={styles['login-form']}>
          <label htmlFor="email" className={styles['login-label']}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={checkEmail} // Add onBlur event to check email
            className={styles['login-input']}
            required
          />
          <label htmlFor="password" className={styles['login-label']}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles['login-input']}
            required
          />
          <button type="submit" className={styles['login-button']}>Login</button>

          <p className={styles['register-link']}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
