// // models/Product.js
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Title is required'],
//       trim: true,
//       maxlength: 100,
//     },
//     description: {
//       type: String,
//       required: [true, 'Description is required'],
//       maxlength: 2000,
//     },
//     price: {
//       type: Number,
//       required: [true, 'Price is required'],
//       min: [0, 'Price cannot be negative'],
//     },
//     images: {
//       type: [String], // array of Cloudinary URLs
//       default: [],
//       validate: {
//         validator: (arr) => arr.length <= 6,
//         message: 'You can upload a maximum of 6 images',
//       },
//     },
//     category: {
//       type: String,
//       required: [true, 'Category is required'],
//       enum: [
//         'Electronics',
//         'Furniture',
//         'Vehicles',
//         'Fashion',
//         'Books',
//         'Home & Garden',
//         'Sports',
//         'Toys & Games',
//         'Other',
//       ],
//     },
//     condition: {
//       type: String,
//       required: [true, 'Condition is required'],
//       enum: ['New', 'Like New', 'Good', 'Fair'],
//     },
//     location: {
//       type: String,
//       required: [true, 'Location is required'],
//       trim: true,
//     },
//     sellerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['Available', 'Sold'],
//       default: 'Available',
//     },
//   },
//   { timestamps: true }
// );

// // Text index for search by title/description
// productSchema.index({ title: 'text', description: 'text' });
// productSchema.index({ category: 1 });
// productSchema.index({ price: 1 });

// module.exports = mongoose.model('Product', productSchema);

// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: {
      type: [String], // array of Cloudinary URLs
      default: [],
      validate: {
        validator: (arr) => arr.length <= 6,
        message: "You can upload a maximum of 6 images",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true, // Removed enum so users can enter any custom string
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
      trim: true,
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["New", "Like New", "Good", "Fair"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Sold"],
      default: "Available",
    },
  },
  { timestamps: true },
);

// Indexes for fast searching and filtering
productSchema.index({ title: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ subcategory: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model("Product", productSchema);
