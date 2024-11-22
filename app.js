import express from 'express'; // Framework Express
import { join } from 'path';  // Untuk bekerja dengan path file
import { dirname } from 'path'; 
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url)); // Mendapatkan direktori file ini

const app = express();

// Middleware keamanan
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

// Nonaktifkan header X-Powered-By
app.disable('x-powered-by');

// Middleware untuk melayani file statis dari folder 'dist'
app.use(express.static(join(__dirname, 'dist')));

// API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Secure Express.js!' });
});

// Route fallback untuk SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

export default app; // Ekspor aplikasi untuk digunakan di server
