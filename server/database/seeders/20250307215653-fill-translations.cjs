"use strict";

const translationsPartials = [
  {
    key: "general_author_name",
    text_ua: "Григорій Обертайло",
  },
  {
    key: "header_link_books",
    text_ua: "Книги",
  },
  {
    key: "header_link_author",
    text_ua: "Автор",
  },
  {
    key: "header_link_announcement",
    text_ua: "Анонс",
  },
  {
    key: "header_link_sale",
    text_ua: "Акції",
  },
  {
    key: "header_link_events",
    text_ua: "Події",
  },
  {
    key: "footer_links_title",
    text_ua: "Сайт",
  },
  {
    key: "footer_link_books",
    text_ua: "Книги",
  },
  {
    key: "footer_link_author",
    text_ua: "Автор",
  },
  {
    key: "footer_link_announcement",
    text_ua: "Анонс",
  },
  {
    key: "footer_link_sale",
    text_ua: "Акції",
  },
  {
    key: "footer_info_title",
    text_ua: "Інформація",
  },
  {
    key: "footer_info_delivery_and_payment",
    text_ua: "доставка і оплата",
  },
  {
    key: "footer_info_cooperation",
    text_ua: "Співпраця",
  },
  {
    key: "footer_info_refund",
    text_ua: "Повернення товару",
  },
  {
    key: "footer_info_events",
    text_ua: "Події",
  },
  {
    key: "instagram_link",
    text_ua: "https://www.instagram.com/",
  },
  {
    key: "youtube_link",
    text_ua: "https://www.youtube.com/",
  },
  {
    key: "facebook_link",
    text_ua: "https://www.facebook.com/",
  },
  {
    key: "footer_license",
    text_ua:
      "Kyiv Type Serif font by Dmitry Rastvortsev, licensed under CC BY-ND 4.0",
  },
  {
    key: "button_more",
    text_ua: "Більше",
  },
  {
    key: "button_buy",
    text_ua: "Купити",
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
