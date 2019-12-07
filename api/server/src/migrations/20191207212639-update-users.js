"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Users", "WarehouseId", {
        type: Sequelize.INTEGER
      })
      .then(() => {
        return queryInterface.addColumn("Users", "ProviderId", {
          type: Sequelize.INTEGER
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "Users", // name of the Target model
        "WarehouseId" // key we want to remove
      )
      .then(() => {
        return queryInterface.removeColumn(
          "Users", // name of the Target model
          "ProviderId" // key we want to remove
        );
      });
  }
};
