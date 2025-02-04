// src/components/ProductListing.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductListing = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="product-listing">
      {products.length === 0 ? (
        <p></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg shadow cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="mt-1">{product.description}</p>
              <p className="font-bold mt-2">Rs.{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;
