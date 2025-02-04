// src/App.js
import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Profile';
import Header from './components/Header';
import ProductListing from './components/ProductListing';
import Contact from './components/Contact';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const productListingRef = useRef(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    productListingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div>
            {/* Header and Search Results outside of Routes */}
            <Header onSearchResults={handleSearchResults} />
            <div ref={productListingRef}>
              <ProductListing products={searchResults} />
            </div>

            {/* Define Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
