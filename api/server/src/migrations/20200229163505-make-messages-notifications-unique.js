"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      "Notifications",
      ["UserId", "ChannelId"],
      {
        name: "NotificationsIndex",
        type: "unique"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "Notifications",
      "NotificationsIndex"
    );
  }
};
