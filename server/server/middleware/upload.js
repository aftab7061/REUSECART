// middleware/upload.js
// Multer middleware configured with Cloudinary storage for handling file uploads
const multer = require('multer');
const { storage, avatarStorage } = require('../config/cloudinary');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// For product images (multiple, max 6)
const uploadProductImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
}).array('images', 6);

// For single avatar upload
const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}).single('avatar');

module.exports = { uploadProductImages, uploadAvatar };
