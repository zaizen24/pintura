import dotenv from 'dotenv'; // Memuat variabel lingkungan
import https from 'https';  // Membuat server HTTPS
import app from './app.js'; // Mengimpor aplikasi Express
import { sslOptions } from './config/https-config.js';  // Konfigurasi HTTPS

// Memuat file .env
dotenv.config();

// Mengambil port dari .env atau default ke 5000
const HTTPS_PORT = process.env.HTTPS_PORT || 5000;

// Menjalankan server HTTPS
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`Secure server running on ${process.env.APP_URL}:${HTTPS_PORT}`);
});
