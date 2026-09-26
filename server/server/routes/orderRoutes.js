// routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();
// const { createOrder, getMyOrders,getMySales } = require('../controllers/orderController');
// const { protect } = require('../middleware/auth'); // Apne auth middleware ka path use karein

// router.use(protect); // Dono routes protected hone chahiye

// router.post('/', createOrder);
// router.get('/my-orders', getMyOrders);
// router.get('/my-sales', getMySales);

// module.exports = router;
// routes/orderRoutes.js
const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getMySales,
} = require("../controllers/orderController");

// Check Option A vs Option B based on your auth.js
const { protect } = require("../middleware/auth");

// Sabhi order routes ko authenticate karein
router.use(protect);

router.post("/", createOrder); // POST /api/orders
router.get("/my-orders", getMyOrders); // GET /api/orders/my-orders
router.get("/my-sales", getMySales); // GET /api/orders/my-sales

module.exports = router;
