"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bks_purchases", "payment_status", {
      type: Sequelize.ENUM("pending", "completed", "failed", "refunded"),
      allowNull: false,
      defaultValue: "pending",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("bks_purchases", "payment_status");
  },
};
