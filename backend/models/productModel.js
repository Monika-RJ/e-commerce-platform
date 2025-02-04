// models/Product.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    eceofriendly: {
      type: Boolean, 
      default:0,
    }
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
