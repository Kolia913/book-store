"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bks_translations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      key: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      text_ua: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("bks_translations");
  },
};
