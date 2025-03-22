"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bks_purchases", "customer_data", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn("bks_purchases", "customer_data");
  },
};
