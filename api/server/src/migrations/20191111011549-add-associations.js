module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Messages", "UserId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      })
      .then(() => {
        // Messages belongsTo Channel
        return queryInterface.addColumn("Messages", "ChannelId", {
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
        // Comments hasOne Message
        return queryInterface.addColumn("Comments", "MessageId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Messages",
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
        "Messages", // name of the Target model
        "UserId" // key we want to remove
      )
      .then(() => {
        return queryInterface.removeColumn(
          "Messages", // name of the Target model
          "ChannelId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "Comments", // name of the Target model
          "MessageId" // key we want to remove
        );
      });
  }
};
