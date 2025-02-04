// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cartItems);
    } catch (err) {
      console.error('Failed to fetch cart items:', err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.cartItems); // Update cart with new items
    } catch (err) {
      console.error('Failed to add item to cart:', err);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartItems();
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
