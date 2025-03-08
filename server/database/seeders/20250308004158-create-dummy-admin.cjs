"use strict";
require("dotenv").config();
const crypto = require("crypto");

function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const password = process.env["ADMIN_PASSWORD"];

    if (!password) {
      return;
    }

    return queryInterface.bulkInsert("bks_managers", [
      {
        username: process.env["ADMIN_USER"] || "admin",
        password: hashPassword(password),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("bks_managers", null, {});
  },
};
