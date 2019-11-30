"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn("Contacts", "position", {
        type: Sequelize.STRING
      }),
      queryInterface.renameColumn("Contacts", "business", "group")
    );
  },

  down: (queryInterface, Sequelize) => {
    return (
      queryInterface.removeColumn(
        "Contacts", // name of the Target model
        "position" // key we want to remove
      ),
      queryInterface.removeColumn(
        "Contacts", // name of the Target model
        "group" // key we want to remove
      )
    );
  }
};
