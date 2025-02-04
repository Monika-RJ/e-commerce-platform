import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css'; // Updated to match the provided CSS

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://e-commerce-platform-1-sxej.onrender.com/api/users/register', { name, email, password });
      window.location.href = '/login'; // Redirect to login page on successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed'); // Display server error message if available
    }
  };

  const handleSocialAuth = (provider) => {
    window.location.href = `https://e-commerce-platform-1-sxej.onrender.com/api/auth/${provider}`; // Redirect to social auth provider
  };

  return (
      <div className={styles['register-body']}>
        <div className={styles['register-container']}>
          <h2 className={styles['register-title']}>Register</h2>
          {error && <p className={styles['register-error']}>{error}</p>}
          <form onSubmit={handleRegister} className={styles['register-form']}>
            <label htmlFor="name" className={styles['register-label']}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles['register-input']}
            />
            <label htmlFor="email" className={styles['register-label']}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles['register-input']}
            />
            <label htmlFor="password" className={styles['register-label']}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles['register-input']}
            />
            <button type="submit" className={styles['register-button']}>Register</button>
          </form>
          <p className={styles['register-alternative']}>Already have an account? <a href="/login" className={styles['register-link']}>Login</a></p>
          <div className={styles['register-social']}>
            <button onClick={() => handleSocialAuth('google')} className={`${styles['register-social-button']} ${styles.google}`}>
              <i className="fab fa-google"></i> Sign in with Google
            </button>
            <button onClick={() => handleSocialAuth('github')} className={`${styles['register-social-button']} ${styles.github}`}>
              <i className="fab fa-github"></i> Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Register;
