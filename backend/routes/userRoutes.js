const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// @desc    Register a new user
// @route   POST /api/users
router.post('/', registerUser);

// @desc    Authenticate user & get token
// @route   POST /api/users/login
router.post('/login', loginUser);

module.exports = router; 