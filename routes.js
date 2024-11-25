const express = require('express');
const router = express.Router();
const { register } = require('./controllers/authController'); // Correct import

// Route for user registration
router.post('/register', register);

module.exports = router;
