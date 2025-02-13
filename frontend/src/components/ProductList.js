// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import CategoryNavbar from './CategoryNavbar';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductList.module.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = selectedCategory === 'All'
          ? `${process.env.REACT_APP_API_BASE_URL}/products`
          : `${process.env.REACT_APP_API_BASE_URL}/products/category/${selectedCategory}`;
        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleSearchResults = (results) => {
    setProducts(results);
  };

  return (
    <>
      <Header className={styles.header}/>
      <div className={styles.container}>
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          <div>
            <img src="https://media-uk-india-banners.landmarkshops.in/Home-Centre/HC-Desktop-2-Offer-060917.jpg" alt="Slide 1" />
          </div>
          <div>
            <img src="https://media-uk-india-banners.landmarkshops.in/Home-Centre/HC-Desktop-2-Offer-060917.jpg" alt="Slide 1" />

          </div>
          <div>
            <img src="https://media-uk-india-banners.landmarkshops.in/Home-Centre/HC-Desktop-4-Offer-060917.jpg" alt="Slide 2" />

          </div>
          <div>
            <img src="https://media-uk-india-banners.landmarkshops.in/Home-Centre/HC-Desktop-1-Offer-070917.jpg" alt="Slide 3" />
  
          </div>
        </Carousel>
      <div className="container px-4">
      <CategoryNavbar onCategorySelect={setSelectedCategory} />
      <SearchBar onSearchResults={handleSearchResults} />
      
        <h1 className={styles.productTitle}>Products</h1>
        <div className={styles.productGrid}>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
    <Footer className={styles.footer}/>
    </>
  );
};

export default ProductList;
