import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import CategoryNavbar from './CategoryNavbar';
//import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = selectedCategory === 'All'
          ? 'http://localhost:5000/api/products'
          : `http://localhost:5000/api/products/category/${selectedCategory}`;
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
      <div className="w-full h-full">
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          <div>
            <img src="https://media-uk-india-banners.landmarkshops.in/Home-Centre/HC-Desktop-2-Offer-060917.jpg" alt="Slide 1" className="w-full h-auto" />
          </div>
          <div>
            <img src="https://media-uk-india-banners.landmarkshops.in/Home-Centre/HC-Desktop-4-Offer-060917.jpg" alt="Slide 2" className="w-full h-auto" />
          </div>
          <div>
            <img src="https://media-uk-india-banners.landmarkshops.in/Home-Centre/HC-Desktop-1-Offer-070917.jpg" alt="Slide 3" className="w-full h-auto" />
          </div>
        </Carousel>
        <div className="w-full p-4">
          <CategoryNavbar onCategorySelect={setSelectedCategory} />
          <h1 className="text-3xl font-bold mb-4">Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
