const authCheck = require('../middlewares/authCheck');
const Follower = require('../models/Follower');

const router = require('express').Router();

// @desc     Get all followers
// @route    GET /api/follow/ers
// @access   Private
router.get('/ers', authCheck, async (req, res) => {
  try {
    const followers = await Follower.find({ following: req.user._id }).populate(
      'user'
    );
    return res.json(followers);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: 'Unable to fetch followers', err });
  }
});

// @desc   Get all followings
// @route    GET /api/follow/ings
// @access   Private
router.get('/ings', authCheck, async (req, res) => {
  try {
    const following = await Follower.find({ user: req.user._id }).populate(
      'following'
    );
    return res.json(following);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: 'Unable to fetch followings', err });
  }
});

// @desc    Add following
// @route   POST /api/follow/ing-toggle
router.post('/ing-toggle', authCheck, async (req, res) => {
  const { followingId } = req.body;
  try {
    const existingFollowing = await Follower.findOne({
      following: followingId,
    });
    if (existingFollowing) {
    }
  } catch (err) {}
});

module.exports = router;
