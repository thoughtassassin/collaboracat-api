"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Warehouses",
      [
        {
          name: "ANDREWS",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "ARTESIA",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "BIG LAKE",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "BIG SPRING",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "CORP",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "DENVER CITY",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "GAS LIFT",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "HOBBS",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "KERMIT",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "LEVELLAND",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "MIDLAND",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "ODESSA",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "PLEASANTON",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "STINNETT",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Warehouses", null, {});
  }
};
