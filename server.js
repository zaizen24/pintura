const dotenv = require('dotenv'); // Memuat variabel lingkungan dari file .env
const https = require('https');  // Membuat server HTTPS
const fs = require('fs');        // Mengakses file sistem
const path = require('path');    // Mengelola path file/direktori
const { constants } = require('crypto'); // Menggunakan 'constants' untuk SSL/TLS konfigurasi
const app = require('./app.js'); // Mengimpor aplikasi Express
const bodyParser = require('body-parser'); // Add body-parser for parsing request bodies
const { User } = require('./database/models'); // Import User model
const passport = require('passport'); // Import passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Import Google OAuth strategy
const session = require('express-session'); // Import express-session

// Memuat variabel dari file .env
dotenv.config();

// Validasi variabel lingkungan penting
const requiredEnvVars = ['APP_URL', 'HTTPS_PORT', 'SSL_KEY_PATH', 'SSL_CERT_PATH', 'JWT_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  console.error(`ERROR: Variabel lingkungan berikut tidak ditemukan: ${missingVars.join(', ')}`);
  process.exit(1); // Menghentikan aplikasi jika variabel penting tidak ditemukan
}

// Mendapatkan port dan URL dari variabel lingkungan
const HTTPS_PORT = process.env.HTTPS_PORT || 5000; // Default ke 5000 jika HTTPS_PORT tidak diatur
const APP_URL = process.env.APP_URL;

// Konfigurasi SSL/TLS untuk server HTTPS
const sslOptions = {
  key: fs.readFileSync(path.resolve(process.env.SSL_KEY_PATH)), // Membaca file private key SSL
  cert: fs.readFileSync(path.resolve(process.env.SSL_CERT_PATH)), // Membaca file sertifikat SSL
  ca: process.env.SSL_CA_PATH ? fs.readFileSync(path.resolve(process.env.SSL_CA_PATH)) : undefined, // CA opsional
  secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1, // Menonaktifkan TLSv1 dan TLSv1.1
};

// Passport configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.APP_URL}:${process.env.HTTPS_PORT}/auth/google/callback`
}, async (token, tokenSecret, profile, done) => {
  try {
    console.log('Google profile received:', profile); // Log profil Google
    let user = await User.findOne({ where: { googleId: profile.id } });
    if (!user) {
      console.log('User not found. Creating a new user...');
      user = await User.create({
        googleId: profile.id,
  name: profile.displayName,
  email: profile.emails[0].value,
  password: '', // Set password to empty string or handle it appropriately
  created_at: new Date(), // Menambahkan created_at
  updated_at: new Date(), // Menambahkan updated_at
  deleted_at: null, // Atur deleted_at ke null (atau kamu bisa biarkan sesuai logika soft delete)
      });
      console.log('New user created:', user);
    } else {
      console.log('Existing user found:', user);
    }
    return done(null, user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Email already exists:', error.errors[0].message);
      return done(null, false, { message: 'Email already exists' });
    }
    console.error('Error in Google OAuth strategy:', error);
    return done(error, null);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Membuat server HTTPS dan menyimpannya dalam variabel
const server = https.createServer(sslOptions, app);

app.use(bodyParser.json()); // Use body-parser middleware
app.use(passport.initialize()); // Initialize passport

// Configure session and cookie settings
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Ensure the cookie is only used over HTTPS in production
    httpOnly: true, // Prevent JavaScript access to the cookie
    sameSite: 'None' // Allow cross-site cookies
  }
}));

// Passport middleware setelah session
app.use(passport.initialize());
app.use(passport.session()); // Inisialisasi sesi passport

// Middleware to handle OpaqueResponseBlocking errors
app.use((req, res, next) => {
  if (res.statusCode === 0) {
    console.error('Blocked by OpaqueResponseBlocking:', req.originalUrl);
    return res.status(403).json({ message: 'Blocked by OpaqueResponseBlocking' });
  }
  next();
});

// Add headers to allow third-party cookies and storage access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Route for user registration
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for Google OAuth registration
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err); // Debug error
      return res.status(500).json({ message: 'Authentication failed', error: err });
    }
    if (!user) {
      console.error('No user found. Redirecting to home...');
      return res.redirect('/'); // Redirect ke home jika user tidak ditemukan
    }
    req.login(user, (err) => {
      if (err) {
        console.error('Error during login:', err); // Debug login error
        return res.status(500).json({ message: 'Login failed', error: err });
      }
      console.log('User successfully logged in:', user); // Debug sukses login
      return res.redirect('/dashboard'); // Redirect ke dashboard setelah login
    });
  })(req, res, next);
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Menjalankan server HTTPS
server.listen(HTTPS_PORT, () => {
  console.log(`✅ Server aman berjalan di ${APP_URL}:${HTTPS_PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${HTTPS_PORT} is already in use.`);
    process.exit(1); // Exit the process if the port is already in use
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

// Menangani error yang tidak ditangkap
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => {
    console.log('HTTP server closed due to uncaught exception');
    process.exit(1); // Keluar dari aplikasi jika terjadi error tak terduga
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  server.close(() => {
    console.log('HTTP server closed due to unhandled rejection');
    process.exit(1); // Keluar dari aplikasi jika ada promise yang tidak ditangani
  });
});

// Graceful shutdown untuk menangani SIGTERM atau SIGINT
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
