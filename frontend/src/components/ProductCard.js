// src/components/ProductCard.js

import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      addToCart(product._id, 1);
      alert('Added to Cart');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart.');
    }
  };

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col ${
        product.ecofriendly ? 'eco-friendly-card' : 'bg-white'
      }`}
    >
      <div onClick={handleProductClick} className="relative">
        <img src={product.imageUrl} alt={product.name} className="h-56 w-full object-cover" />
        
        {/* Display Eco-Friendly tag only if the product is eco-friendly */}
        {product.ecofriendly && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            Eco-Friendly
          </span>
        )}

        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">Rs.{product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
