
const express = require('express');
const router = express.Router();


// @route   POST http://localhost:5000/auth/register
// @desc    Register user / send confirm mail
// @access  PUBLIC
router.post('/register', (req, res) => {

});

// @route   POST http://localhost:5000/auth/login
// @desc    logged in user / return jwt
// @access  PUBLIC
router.post('/login', (req, res) => {

});




module.exports = router;

