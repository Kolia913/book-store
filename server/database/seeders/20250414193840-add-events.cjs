"use strict";

const events = {
  admin_title: "Події",
  title: {
    admin_title: "Заголовок",
    type: "string",
    value: "Події",
  },
  isActive: true,
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [page] = await queryInterface.sequelize.query(
      `SELECT content FROM bks_pages WHERE key = 'home'`
    );

    if (page.length > 0) {
      const existingContent = JSON.parse(page[0].content);

      existingContent.events = events;

      return queryInterface.bulkUpdate(
        "bks_pages",
        { content: JSON.stringify(existingContent) },
        { key: "home" }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    const [page] = await queryInterface.sequelize.query(
      `SELECT content FROM bks_pages WHERE key = 'home'`
    );

    if (page.length > 0) {
      const existingContent = JSON.parse(page[0].content);

      delete existingContent.events;

      return queryInterface.bulkUpdate(
        "bks_pages",
        { content: JSON.stringify(existingContent) },
        { key: "home" }
      );
    }
  },
};