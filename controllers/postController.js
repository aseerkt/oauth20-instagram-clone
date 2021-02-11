const Post = require('../models/Post');

exports.addPost = async (req, res) => {
  const { title, body } = req.body;
  if ((!title, !body)) {
    return res
      .status(400)
      .json({ success: false, error: 'Input Fields are required' });
  }

  // Deal with imageFile
  let imageURL = 'no_img.jpg';
  try {
    if (req.files) {
      console.log('File got');
      const imageFile = req.files.file;

      if (imageFile) {
        const uploadTime = new Date().toISOString();
        const randomFill = require('crypto').randomBytes(10).toString('hex');
        await imageFile.mv(
          `${__dirname}/../client/public/uploads/${uploadTime}_${randomFill}_${imageFile.name}`
        );
        imageURL = `uploads/${uploadTime}_${randomFill}_${imageFile.name}`;
      }
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Upload Failure' });
  }

  // Upload Post to DB

  try {
    const newPost = await new Post({
      author: req.user._id,
      title,
      body,
      imageURL,
    }).save();
    Post.populate(newPost, 'author', (err, populatedPost) => {
      if (err) throw err;
      return res.status(201).json(populatedPost);
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: 'Adding Post Failed' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    return res.json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: 'Unable to fetch posts' });
  }
};
