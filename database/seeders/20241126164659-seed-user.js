'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        role_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,

  },
  {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: 'password',
    role_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
]);
  },
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
