"use strict";

const translationsPartials = [
  {
    key: "available",
    text_ua: "в наявності",
  },
  {
    key: "not_available",
    text_ua: "Немає в наявності",
  },
  {
    key: "buy_with_signature",
    text_ua: "Купити з підписом автора",
  },
  {
    key: "cart_delete_all",
    text_ua: "видалити все",
  },
  {
    key: "cart_delete",
    text_ua: "видалити",
  },
  {
    key: "cart_checkout",
    text_ua: "Оформити замовлення",
  },
  {
    key: "quantity_postfix",
    text_ua: "шт.",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("bks_translations", translationsPartials);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("bks_translations", null, {});
  },
};
