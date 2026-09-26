// controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/Product");

// 1. Create new order (Buy Product)
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { productId, shippingAddress } = req.body;

    // 1. Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Prevent buying your own product
    const sellerId = product.sellerId || product.user;
    if (sellerId.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot buy your own product" });
    }

    // 3. Check if already sold
    if (product.status === "Sold" || product.isSold) {
      return res.status(400).json({ message: "This item is already sold" });
    }

    // 4. Create Order
    const order = await Order.create({
      product: product._id,
      buyer: req.user._id,
      seller: sellerId,
      amount: product.price,
      shippingAddress,
      status: "Completed",
    });

    // 5. Update Product status to 'Sold'
    product.status = "Sold";
    product.isSold = true;
    await product.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// 2. BUYER VIEW: Kharide hue orders + Seller details
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate({
        path: "product",
        select:
          "title price description category condition location images status isSold createdAt",
      })
      .populate({
        path: "seller",
        select: "name email phone avatar createdAt",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
}; // 👈 Yahan getMyOrders end ho gaya!

// 3. SELLER VIEW: Beche hue products + Buyer details
// @route   GET /api/orders/my-sales
// @access  Private
exports.getMySales = async (req, res, next) => {
  try {
    const sales = await Order.find({ seller: req.user._id })
      .populate("product", "title price images")
      .populate("buyer", "name email phone avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: sales.length, sales });
  } catch (error) {
    next(error);
  }
};
