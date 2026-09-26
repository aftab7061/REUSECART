// routes/wishlistRoutes.js
const express = require('express');
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  checkWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // all wishlist routes require auth

router.route('/').get(getWishlist).post(addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.get('/check/:productId', checkWishlist);

module.exports = router;
