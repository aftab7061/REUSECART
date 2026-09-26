// routes/productRoutes.js
const express = require("express");
const {
  createProduct,
  getProducts,
  getCategories, // 1. Import getCategories
  getProductById,
  updateProduct,
  deleteProduct,
  markAsSold,
  getMyListings,
  removeProductImage,
  getProductsByLocation,
} = require("../controllers/productController");
const { protect } = require("../middleware/auth");
const { uploadProductImages } = require("../middleware/upload");

const router = express.Router();

// IMPORTANT: Specific routes MUST be defined BEFORE /:id to avoid collision
router.get("/my-listings", protect, getMyListings);
router.get("/categories", getCategories); // 2. Add /categories route HERE
router.get("/location", getProductsByLocation);

router
  .route("/")
  .get(getProducts)
  .post(protect, uploadProductImages, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, uploadProductImages, updateProduct)
  .delete(protect, deleteProduct);

router.patch("/:id/sold", protect, markAsSold);
router.delete("/:id/images", protect, removeProductImage);

module.exports = router;
