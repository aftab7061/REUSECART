// controllers/userController.js
const User = require('../models/User');

// @desc    Update logged-in user's profile (name, phone, location, avatar)
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, phone, location } = req.body;

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;

    // req.file populated by multer-cloudinary avatar middleware
    if (req.file) {
      user.avatar = req.file.path;
    }

    const updated = await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        avatar: updated.avatar,
        phone: updated.phone,
        location: updated.location,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProfile, changePassword };
