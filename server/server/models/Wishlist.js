// models/Wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent the same user from wishlisting the same product twice
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
