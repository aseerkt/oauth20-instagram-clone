const passport = require('passport');
const router = require('express').Router();
const authController = require('../controllers/authController');
const authCheck = require('../middlewares/authCheck');

// @desc     Authenticate Google User
// @route    GET /auth/google
// @access   Public
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    // successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/login',
  }),
  (req, res) => {
    // Successful authentication redirect home
    console.log(req.user);
    // Successful authentication redirect home
    // req.session.user = req.user;
    res.redirect('http://localhost:3000/');
  }
);

router.get('/user', authCheck, authController.getUser);

router.get('/user/logout', authCheck, authController.logout);

module.exports = router;
