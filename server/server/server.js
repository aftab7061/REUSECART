
// ----------------------------------------------------------

require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // Fix: Uncommented cors require
const connectDB = require("./config/db");

// Middleware Imports
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Routes Import
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "ReSellHub API is running" });
});

// Create HTTP Server for Express + Socket.io
const server = http.createServer(app); // Fix: Uncommented server initialization

// Socket.io Config with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// 404 & Error Handling (Must be defined last)
app.use(notFound);
app.use(errorHandler);

// Port Configuration
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `ReSellHub server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
