const express = require('express');
const passport = require('passport'); // Add this line
const { register, login, logout } = require('../Controllers/authController');

const router = express.Router();

router.post('/register', (req, res, next) => {
  console.log('Register route hit');
  next();
}, register);

router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  next();
}, login);

// logout
router.post('/logout', (req, res, next) => {
  console.log('Logout route hit');
  next();
}, logout);

router.get('/google-register', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  function(req, res) {
    res.redirect('/dashboard');
  }
);

// Handle SSL errors
router.use((err, req, res, next) => {
  if (err.code === 'ERR_SSL_PROTOCOL_ERROR') {
    console.error('SSL Protocol Error:', err);
    res.status(500).json({ message: 'SSL Protocol Error' });
  } else {
    next(err);
  }
});

module.exports = router;
