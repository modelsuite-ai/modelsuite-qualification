const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @desc  Get all talent users (for assignment dropdown)
// @route GET /api/users/talents
// @access Admin
router.get('/talents', protect, adminOnly, async (req, res) => {
  try {
    // Intentional gap: returns full user objects — should project only _id, name, email
    const talents = await User.find({ role: 'Talent' });
    res.json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
