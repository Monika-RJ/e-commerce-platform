// src/components/CategoryNavbar.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryNavbar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://e-commerce-platform-1-sxej.onrender.com/api/products');
        const allProducts = response.data;
        const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="bg-green-800 p-4">
      <ul className="flex space-x-4">
        {categories.map(category => (
          <li key={category}>
            <button
              onClick={() => onCategorySelect(category)}
              className="text-white hover:text-gray-400"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavbar;
