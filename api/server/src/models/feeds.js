"use strict";
module.exports = (sequelize, DataTypes) => {
  const Feeds = sequelize.define(
    "Feeds",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Feeds.associate = function(models) {
    Feeds.belongsToMany(models.Users, {
      through: "UserFeeds",
      as: "feeds",
      foreignKey: "UserId",
      otherKey: "FeedId"
    });
  };
  return Feeds;
};
