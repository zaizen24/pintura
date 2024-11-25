const express = require('express');
const passport = require('passport'); // Add this line
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

router.get('/google-register', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  function(req, res) {
    // On successful login, redirect to dashboard
    res.redirect('/dashboard'); // Change this as needed to navigate
  }
);

module.exports = router;
