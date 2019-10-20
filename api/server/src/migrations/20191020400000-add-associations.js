module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Channels", "feedId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Feeds",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      })
      .then(() => {
        // Contacts belongsTo Channel
        return queryInterface.addColumn("Contacts", "channelId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Channels",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      })
      .then(() => {
        // Users hasOne Role
        return queryInterface.addColumn("Users", "roleId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Roles",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      })
      .then(() => {
        // Users hasMany Feeds
        return queryInterface.addColumn("UserFeeds", "userId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      })
      .then(() => {
        // Feeds hasMany Users
        return queryInterface.addColumn("UserFeeds", "feedId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Feeds",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      })
      .then(() => {
        // Users hasMany Channels
        return queryInterface.addColumn("UserChannels", "userId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      })
      .then(() => {
        // Channels hasMany Users
        return queryInterface.addColumn("UserChannels", "channelId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Channels",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "Channels", // name of Source model
        "feedId" // key we want to remove
      )
      .then(() => {
        return queryInterface.removeColumn(
          "Contacts", // name of the Target model
          "channelId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "Users", // name of the Target model
          "roleId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "UserFeeds", // name of the Target model
          "userId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "UserFeeds", // name of the Target model
          "feedId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "UserChannels", // name of the Target model
          "userId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "UserChannels", // name of the Target model
          "channelId" // key we want to remove
        );
      });
  }
};
