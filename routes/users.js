const authCheck = require('../middlewares/authCheck');
const User = require('../models/User');

const router = require('express').Router();

// @desc    Get user with id
// @route   GET /api/users/:username
// @acess   Private
router.get('/u/:username', authCheck, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ success: false, error: 'No user found' });
    }
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, error: 'Unable to fetch user', err });
  }
});

// @desc    Get all users
// @route   GET /api/users/all
// @access  Private
router.get('/all', authCheck, async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: ' Unable to fetch all users',
      err,
    });
  }
});

module.exports = router;
