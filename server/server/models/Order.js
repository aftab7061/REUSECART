// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: [true, 'Shipping address is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Completed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);