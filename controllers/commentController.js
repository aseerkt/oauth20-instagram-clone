const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const newComment = await new Comment({
      author: req.user._id,
      post: req.params.postId,
      comment,
    }).save();
    Comment.populate(newComment, 'author', (err, populatedComment) => {
      if (err) throw err;
      return res.status(201).json(populatedComment);
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: 'Unable to add comment', err });
  }
};
