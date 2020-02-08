"use strict";
module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define(
    "Channels",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Channels.associate = function(models) {
    Channels.belongsTo(models.Feeds);
    Channels.belongsToMany(models.Users, {
      through: "UserChannels",
      as: "users",
      foreignKey: "ChannelId",
      otherKey: "UserId"
    });
  };
  return Channels;
};
