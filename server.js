const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

// Konfigurasi HTTPS
const sslOptions = {
  key: fs.readFileSync('private.key'), // Jalur ke kunci privat
  cert: fs.readFileSync('certificate.crt'), // Jalur ke sertifikat
};

// Percayai proxy jika di belakang proxy (Nginx, AWS ELB, dll.)
app.set('trust proxy', true);

// Middleware Keamanan
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https: data:;"
  );
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Hapus header X-Powered-By
app.disable('x-powered-by');

// Middleware untuk melayani file statis dari folder 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// API Endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Secure Express.js!' });
});

// Route fallback untuk SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// blokir robots.txt
app.use((req, res, next) => {
    if (req.url === '/robots.txt') {
      res.status(403).send('Access to robots.txt is restricted');
    } else {
      next();
    }
  });
  

// Jalankan server HTTPS
const HTTPS_PORT = process.env.HTTPS_PORT || 5000;
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`Secure server running on https://localhost:${HTTPS_PORT}`);
});
