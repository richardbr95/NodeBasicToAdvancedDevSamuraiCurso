"use strict";

const { default: Sequelize } = require("@sequelize/core");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn("users", "provider");
  },

  async down(queryInterface) {
    await queryInterface.addColumn("users", "provider", {
      type: Sequelize.BOOLEAN,
      default: false,
      allowNull: false,
    });
  },
};
