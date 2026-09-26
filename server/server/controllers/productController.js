
// controllers/productController.js
const Product = require("../models/Product");

// @desc    Create a new product listing
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      category,
      subcategory,
      condition,
      location,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !subcategory ||
      !condition ||
      !location
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    // req.files populated by multer-cloudinary middleware
    const images = req.files ? req.files.map((file) => file.path) : [];

    const product = await Product.create({
      title,
      description,
      price,
      category,
      subcategory,
      condition,
      location,
      images,
      sellerId: req.user._id,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products with search, filters & pagination
// @route   GET /api/products
// @access  Public
// Query params: search, category, subcategory, minPrice, maxPrice, condition, page, limit, status
const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      subcategory,
      minPrice,
      maxPrice,
      condition,
      page = 1,
      limit = 12,
      status = "Available",
    } = req.query;

    const query = {};

    if (status) query.status = status;

    // Case-insensitive regex matching for user-entered categories and subcategories
    if (category) query.category = { $regex: category, $options: "i" };
    if (subcategory) query.subcategory = { $regex: subcategory, $options: "i" };
    if (condition) query.condition = condition;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.max(Number(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("sellerId", "name avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

/// @desc    Get all unique categories and their associated subcategories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      // 1. Missing/Empty category aur subcategory values ko exclude karein
      {
        $match: {
          category: { $exists: true, $ne: "" },
          subcategory: { $exists: true, $ne: "" },
        },
      },
      // 2. Category ke hisaab se group karein aur unique subcategories collect karein
      {
        $group: {
          _id: "$category",
          subcategories: { $addToSet: "$subcategory" },
        },
      },
      // 3. Response format clean karein aur null/empty subcategories ko filter out karein
      {
        $project: {
          _id: 0,
          category: "$_id",
          subcategories: {
            $filter: {
              input: "$subcategories",
              as: "sub",
              cond: {
                $and: [{ $ne: ["$$sub", null] }, { $ne: ["$$sub", ""] }],
              },
            },
          },
        },
      },
      // 4. Alphabetical order mein sort karein
      { $sort: { category: 1 } },
    ]);

    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "sellerId",
      "name avatar email location",
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product (owner only)
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this product" });
    }

    const {
      title,
      description,
      price,
      category,
      subcategory,
      condition,
      location,
      status,
    } = req.body;

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (subcategory) product.subcategory = subcategory;
    if (condition) product.condition = condition;
    if (location) product.location = location;
    if (status) product.status = status;

    // If new images were uploaded, append them (existing images preserved unless replaced)
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      product.images = [...product.images, ...newImages].slice(0, 6);
    }

    const updated = await product.save();

    res.status(200).json({ success: true, product: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product (owner only)
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a product as Sold (owner only)
// @route   PATCH /api/products/:id/sold
// @access  Private
const markAsSold = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this product" });
    }

    product.status = "Sold";
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in user's own listings
// @route   GET /api/products/my-listings
// @access  Private
const getMyListings = async (req, res, next) => {
  try {
    const products = await Product.find({ sellerId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a single image from a product (owner only)
// @route   DELETE /api/products/:id/images
// @access  Private
const removeProductImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    product.images = product.images.filter((img) => img !== imageUrl);
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};


// @desc    Get products filtered by location, category, search, and price
// @route   GET /api/products/location
// @access  Public
const getProductsByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    let query = { status: "Available" };

    // Sirf Location filter apply karein
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Database se products find karein
    const products = await Product.find(query)
      .populate("sellerId", "name email location avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching products by location",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getCategories,
  getProductById,
  updateProduct,
  deleteProduct,
  markAsSold,
  getMyListings,
  removeProductImage,
  getProductsByLocation,
};
