// src/components/Header.js

import React, { useState } from 'react';
import { AiFillHome, AiOutlineShoppingCart, AiOutlineMail, AiOutlineUserAdd, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import styles from './Header.module.css';

const Header = () => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/search', {
        params: { query },
      });
      // Handle search results (e.g., display them on the page or pass to a parent component)
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>RJ's Store</h1>

        {/* Search Bar in the middle of the header */}
        <div className={styles.searchContainer}>
          <div className="flex items-center border border-gray-300 rounded-lg p-1 w-64">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 p-2 border-none focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white px-3 py-2 rounded-lg ml-2 flex items-center"
            >
              <AiOutlineSearch size={18} />
            </button>
          </div>
        </div>

        <nav>
          <ul className={styles.navList}>
            <li><a href="/" className={styles.navItem}><AiFillHome size={20} /> Home</a></li>
            <li><a href="/cart" className={styles.navItem}><AiOutlineShoppingCart size={20} /> Cart</a></li>
            <li><a href="/contact" className={styles.navItem}><AiOutlineMail size={20} /> Contact Us</a></li>
            <li><a href="/register" className={styles.navItem}><AiOutlineUserAdd size={20} /> Register</a></li>
            <li><a href="/profile" className={styles.navItem}><AiOutlineUser size={20} /> Profile</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
