// routes/cartRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');

const router = express.Router();

// Add to cart
router.post('/', protect, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        cart.cartItems.push({ product: productId, quantity });
      }

      cart = await cart.save();
    } else {
      cart = new Cart({
        user: req.user._id,
        cartItems: [{ product: productId, quantity }],
      });
      await cart.save();
    }

    console.log("Cart after saving:", cart);  // Debug log
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);  // Debug log
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});

// Get user's cart
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);  // Debug log
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

// Delete item from cart
router.delete('/:productId', protect, async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.cartItems.splice(itemIndex, 1); // Remove the item from cartItems array
        cart = await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
});


module.exports = router;
