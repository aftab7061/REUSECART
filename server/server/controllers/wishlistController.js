// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Add a product to the logged-in user's wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existing = await Wishlist.findOne({ userId: req.user._id, productId });
    if (existing) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const wishlistItem = await Wishlist.create({ userId: req.user._id, productId });

    res.status(201).json({ success: true, wishlistItem });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in user's wishlist (with populated product details)
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res, next) => {
  try {
    const items = await Wishlist.find({ userId: req.user._id }).populate({
      path: 'productId',
      populate: { path: 'sellerId', select: 'name avatar' },
    });

    // Filter out any wishlist entries whose product was deleted
    const products = items.filter((item) => item.productId).map((item) => ({
      wishlistId: item._id,
      ...item.productId.toObject(),
    }));

    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const result = await Wishlist.findOneAndDelete({
      userId: req.user._id,
      productId,
    });

    if (!result) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.status(200).json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if a product is in the user's wishlist
// @route   GET /api/wishlist/check/:productId
// @access  Private
const checkWishlist = async (req, res, next) => {
  try {
    const item = await Wishlist.findOne({
      userId: req.user._id,
      productId: req.params.productId,
    });
    res.status(200).json({ success: true, inWishlist: !!item });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist, checkWishlist };
