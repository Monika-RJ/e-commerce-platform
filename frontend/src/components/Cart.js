// src/components/Cart.js
import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Cart.css';
import { motion } from 'framer-motion';
//import Header from './Header';

const Cart = () => {
  const { cartItems, removeFromCart, fetchCartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems(); // Fetch cart items from backend on load
  }, [fetchCartItems]);

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
  };

  const getTotalQuantity = () => 
    cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    
  const getTotalAmount = () => 
    cartItems.reduce((total, item) => 
      total + (item.product?.price || 0) * (item.quantity || 0), 0);

  const handleProceedToPay = () => {
    if (isAuthenticated) {
      navigate('/payment');
    } else {
      navigate('/register');
    }
  };

  return (
    <>
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                className="cart-item bg-white p-4 rounded-md shadow-md mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.product && ( // Ensure product exists
                  <>
                    <img src={item.product.imageUrl} alt={item.product.name} />
                    <h2>{item.product.name}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: Rs.{(item.product.price * item.quantity).toFixed(2)}</p>
                    <br></br>
                    <div className="button-container" style={{ display: "flex", gap: "80px" }}>
                    <motion.button
                      onClick={() => handleRemove(item.product._id)} // Use product._id for deletion
                      className="remove-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                    <motion.button
                      onClick={handleProceedToPay} // Use product._id for deletion
                      className="pay-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
              Checkout
                    </motion.button></div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="summary-item">
              <span>Total Quantity:</span>
              <span>{getTotalQuantity()}</span>
            </div>
            <div className="summary-item">
              <span>Total Amount:</span>
              <span>Rs.{getTotalAmount().toFixed(2)}</span>
            </div>
            <motion.button
              className="proceed-button"
              onClick={handleProceedToPay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Proceed to Pay
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;
