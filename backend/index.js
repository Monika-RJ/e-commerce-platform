const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://e-commerce-website111.netlify.app" // Replace with your actual frontend URL
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Ensure CORS headers are applied globally
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://e-commerce-website111.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});



// Import and use user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Import and use product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Import and use cart routes
const cartRoutes = require('./routes/CartRoutes');
app.use('/api/cart', cartRoutes);

const profRoutes = require('./routes/userRoutes');
app.use('/api/users/profile', profRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
