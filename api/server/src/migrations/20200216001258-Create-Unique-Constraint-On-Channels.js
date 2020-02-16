"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn("Channels", "name", {
      type: Sequelize.STRING,
      unique: true
    }),
  down: queryInterface =>
    queryInterface.changeColumn("Channels", "name", {
      type: Sequelize.STRING
    })
};
