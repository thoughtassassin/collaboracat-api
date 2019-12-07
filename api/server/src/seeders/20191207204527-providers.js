"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Providers",
      [
        {
          name: "at&t",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "sprint",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "t-mobile",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "verizon",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Providers", null, {});
  }
};
