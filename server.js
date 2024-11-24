const dotenv = require('dotenv'); // Memuat variabel lingkungan dari file .env
const https = require('https');  // Membuat server HTTPS
const fs = require('fs');        // Mengakses file sistem
const path = require('path');    // Mengelola path file/direktori
const { constants } = require('crypto'); // Menggunakan 'constants' untuk SSL/TLS konfigurasi
const app = require('./app.js'); // Mengimpor aplikasi Express


// Memuat variabel dari file .env
dotenv.config();

// Validasi variabel lingkungan penting
const requiredEnvVars = ['APP_URL', 'HTTPS_PORT', 'SSL_KEY_PATH', 'SSL_CERT_PATH', 'JWT_SECRET'];
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

// Membuat server HTTPS dan menyimpannya dalam variabel
const server = https.createServer(sslOptions, app);

// Menjalankan server HTTPS
server.listen(HTTPS_PORT, () => {
  console.log(`✅ Server aman berjalan di ${APP_URL}:${HTTPS_PORT}`);
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
