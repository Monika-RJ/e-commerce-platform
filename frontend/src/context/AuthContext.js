// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, { email, password });
      
      // Check if token exists in the response
      if (res.data && res.data.token) {
        const token = res.data.token;
        localStorage.setItem('token', token);

        // Decode token to get user details
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);  // Set decoded user information
        setIsAuthenticated(true);
        
        console.log('User details:', decodedUser);
        console.log(token); // Print user details in console
      } else {
        console.error('Token not found in response');
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setIsAuthenticated(true);
        console.log('User details:', decodedUser); // Display user details on initial load
      } catch (error) {
        console.error('Invalid token');
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
