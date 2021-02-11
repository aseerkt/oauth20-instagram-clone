const router = require('express').Router();
const { addComment } = require('../controllers/commentController');
const authCheck = require('../middlewares/authCheck');
const Comment = require('../models/Comment');

// @access   Private
// @desc     Post comment
// @route    POST /api/comments/:postId
router.post('/:postId', authCheck, addComment);

// @access   Private
// @desc     GET comments for post
// @route    GET /api/comments/:postId
router.get('/:postId', authCheck, async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      'author'
    );
    return res.json(comments);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: 'Unable to fetch Comments', err });
  }
});

module.exports = router;
