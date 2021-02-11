exports.getUser = (req, res) => {
  // console.log(req.user);
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Unable to load user', err });
  }
};

exports.logout = (req, res) => {
  req.logout();
  req.session = null;
  res.json({ success: true, msg: 'User logout Success' });
};
