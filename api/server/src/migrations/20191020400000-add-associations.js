module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Channels", "FeedId", {
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
        return queryInterface.addColumn("Contacts", "ChannelId", {
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
        return queryInterface.addColumn("Users", "RoleId", {
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
        return queryInterface.addColumn("UserFeeds", "UserId", {
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
        return queryInterface.addColumn("UserFeeds", "FeedId", {
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
        return queryInterface.addColumn("UserChannels", "UserId", {
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
        return queryInterface.addColumn("UserChannels", "ChannelId", {
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
        "FeedId" // key we want to remove
      )
      .then(() => {
        return queryInterface.removeColumn(
          "Contacts", // name of the Target model
          "ChannelId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "Users", // name of the Target model
          "RoleId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "UserFeeds", // name of the Target model
          "UserId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "UserFeeds", // name of the Target model
          "FeedId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "UserChannels", // name of the Target model
          "UserId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "UserChannels", // name of the Target model
          "ChannelId" // key we want to remove
        );
      });
  }
};
