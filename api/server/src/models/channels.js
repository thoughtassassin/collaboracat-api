"use strict";
module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define(
    "Channels",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        someUnique: { type: DataTypes.STRING, unique: true }
      }
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
