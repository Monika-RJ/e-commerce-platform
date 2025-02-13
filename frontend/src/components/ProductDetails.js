// src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
        setProduct(response.data);

        const relatedResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/category/${response.data.category}`);
        setRelatedProducts(relatedResponse.data.filter(item => item._id !== id));
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    alert('Added to Cart');
    navigate('/cart');
  };

  const handleBuyNow = () => {
    alert('Proceeding to Checkout');
    navigate("/checkout");
  };

  const handleRelatedProductClick = (relatedId) => {
    navigate(`/products/${relatedId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2 p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Rs.{product.price.toFixed(2)}</h2>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-6xl mx-auto mt-12 p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map(relatedProduct => (
            <div
              key={relatedProduct._id}
              onClick={() => handleRelatedProductClick(relatedProduct._id)}
              className="cursor-pointer p-4 bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={relatedProduct.imageUrl}
                alt={relatedProduct.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h4 className="text-lg font-medium text-gray-700 mt-4">{relatedProduct.name}</h4>
              <p className="text-blue-600 font-semibold">Rs.{relatedProduct.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;