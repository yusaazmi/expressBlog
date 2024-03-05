'use strict';
const bcrypt = require('bcrypt');
const { User } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //  super admin
    await User.create({
      fullName: "Super Admin",
      email: "superadmin@gmail.com",
      password: bcrypt.hashSync("password123", 10),
      role: "Super Admin",
      status: "Active"
    });

    //  creator
    await User.create({
      fullName: "Creator",
      email: "creator@gmail.com",
      password: bcrypt.hashSync("password123", 10),
      role: "Creator",
      status: "Active"
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
