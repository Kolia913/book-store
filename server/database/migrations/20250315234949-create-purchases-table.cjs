"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bks_purchases", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      payment_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      delivery_data: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {},
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      cart_data: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {},
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "bks_customers",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("bks_purchases");
  },
};
