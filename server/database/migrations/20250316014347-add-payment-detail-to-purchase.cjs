"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bks_purchases", "payment_details", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn("bks_purchases", "payment_details");
  },
};
