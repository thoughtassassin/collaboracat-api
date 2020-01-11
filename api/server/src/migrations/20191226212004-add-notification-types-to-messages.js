"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Messages", "priority", {
      type: Sequelize.BOOLEAN
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Messages", "priority");
  }
};
