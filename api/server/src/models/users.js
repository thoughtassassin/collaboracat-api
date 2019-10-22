"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  Users.associate = function(models) {
    Users.belongsTo(models.Role);
    Users.belongsToMany(models.Feeds, {
      through: "UserFeeds",
      as: "feeds",
      foreignKey: "UserId",
      otherKey: "FeedId"
    });
    Users.belongsToMany(models.Channels, {
      through: "UserChannels",
      as: "channels",
      foreignKey: "UserId",
      otherKey: "ChannelId"
    });
  };
  return Users;
};
