// routes/userRoutes.js
const express = require('express');
const { updateProfile, changePassword } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { uploadAvatar } = require('../middleware/upload');

const router = express.Router();

router.use(protect);

router.put('/profile', uploadAvatar, updateProfile);
router.put('/change-password', changePassword);

module.exports = router;
