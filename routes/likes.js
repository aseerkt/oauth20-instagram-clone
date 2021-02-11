const router = require('express').Router();
const authCheck = require('../middlewares/authCheck');
const Like = require('../models/Like');

// @desc     Get all likes for one post
// @route    GET /api/likes/:postId
// @access    Private
router.get('/:postId', authCheck, async (req, res) => {
  try {
    const likes = await Like.find({ post: req.params.postId }).populate(
      'author'
    );
    return res.json(likes);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Fetching Likes for the post failed',
      err,
    });
  }
});

// @desc     Toggle like for a post
// @route    POST /api/likes/toggle-like
// @access   Private
router.post('/toggle-like', authCheck, async (req, res) => {
  const { postId } = req.body;
  try {
    const existingLike = await Like.findOne({
      post: postId,
      author: req.user._id,
    });
    if (existingLike) {
      existingLike.liked = !existingLike.liked;
      const updatedLike = await existingLike.save();
      return res.json(updatedLike);
    }
    console.log('new created');
    const newLike = await Like.create({
      author: req.user._id,
      post: postId,
    });
    return res.status(201).json(newLike);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, error: 'Toggling like failed', err });
  }
});

module.exports = router;
