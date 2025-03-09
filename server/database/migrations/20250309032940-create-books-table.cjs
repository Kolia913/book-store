"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bks_books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      author: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },
      page_desc_caption: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_on_sale: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      price_with_signature: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      discount_price: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      discount_price_with_signature: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
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
    await queryInterface.dropTable("bks_books");
  },
};
