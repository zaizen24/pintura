const express = require('express');
const { register } = require('../Controllers/authController');

const router = express.Router();

// Rute untuk registrasi pengguna
router.post('/register', register);

module.exports = router;
