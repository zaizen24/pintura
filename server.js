import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url)); // Mendapatkan __dirname dalam modul ESM

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
    "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; " +
    "style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com 'unsafe-inline'; " +
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' https: data:;"
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
app.use(express.static(join(__dirname, 'dist')));

// Middleware tambahan untuk file tertentu seperti JSX
app.use((req, res, next) => {
  if (req.url.endsWith('.jsx')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// API Endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Secure Express.js!' });
});

// Route fallback untuk SPA
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Blokir robots.txt
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
