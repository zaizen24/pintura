const bcrypt = require('bcrypt');
const db = require('../database/models'); // Correct path to your models

const { User } = db;

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validasi input: pastikan semua field diisi
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validasi format email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error); // Log error for debugging
    return res.status(500).json({ message: 'Internal server error, please try again later.' });
  }
};

module.exports = {
  register,
};
