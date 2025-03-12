"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bks_pages", {
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
      admin_title: {
        type: Sequelize.STRING(512),
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      content: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: "{}",
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("bks_pages");
  },
};
