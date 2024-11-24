'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 50], // Minimal 2 karakter, maksimal 50
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 50], // Minimal 2 karakter, maksimal 50
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validasi format email
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [8, 100], // Minimal 8 karakter
        },
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
          isIn: [['user', 'admin']], // Role hanya boleh 'user' atau 'admin'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Default waktu sekarang
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Default waktu sekarang
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
