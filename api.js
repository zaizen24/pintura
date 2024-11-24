const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/route'); // Import rute otentikasi
const db = require('./database/models'); // Import database models

const app = express();

// Middleware
app.use(bodyParser.json()); // Untuk memproses JSON
app.use(bodyParser.urlencoded({ extended: true })); // Untuk memproses form-urlencoded

// Routes
app.use('/api/auth', authRoutes); // Prefix untuk rute otentikasi

// Database connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Database connection failed:', err));


