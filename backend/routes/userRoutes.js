const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser } = require('../controllers/userController');
const jwt = require('jsonwebtoken');

// Generate JWT (Helper function, can also be in a separate utils file)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/users
router.post('/', registerUser);

// @desc    Authenticate user & get token
// @route   POST /api/users/login
router.post('/login', loginUser);

// @desc    Authenticate with Google
// @route   GET /api/users/auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /api/users/auth/google/callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    // Successful authentication, generate and send token
    const token = generateToken(req.user._id);
    res.json({ token }); // Send token in JSON response
  }
);

// @desc    Authenticate with Facebook
// @route   GET /api/users/auth/facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }),
  (req, res) => {
    // Successful authentication, generate and send token
    const token = generateToken(req.user._id);
    res.json({ token }); // Send token in JSON response
  }
);

module.exports = router; 