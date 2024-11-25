const express = require('express');
const { register, login } = require('../Controllers/authController');

const router = express.Router();

router.post('/register', (req, res, next) => {
  console.log('Register route hit');
  next();
}, register);

router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  next();
}, login);

module.exports = router;
