const router = require('express').Router();
const authCheck = require('../middlewares/authCheck');

const postController = require('../controllers/postController');
const Post = require('../models/Post');

// @access   Private
// @desc     Add Post
// @router   POST /api/posts/add-new
router.post('/add-new', authCheck, postController.addPost);

// @access   Private
// @desc     Get All Posts
// @router   GET /api/posts/all
router.get('/all', authCheck, postController.getAllPosts);

// @access   Private
// @desc     Get posts posted by a user
// @router   GET /api/posts/i/:userId
router.get('/u/:userId', authCheck, async (req, res) => {
  try {
    const postsByUser = await Post.find({ author: req.parms.userId }).populate(
      'author'
    );
    return res.json(postsByUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch posts for the user',
      err,
    });
  }
});

module.exports = router;
