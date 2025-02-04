// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
        </form>
      </div>
    </div>
  );
};

export default Login;
