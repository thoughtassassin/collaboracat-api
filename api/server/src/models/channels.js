"use strict";
module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define(
    "Channels",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      archived: {
        type: DataTypes.BOOLEAN
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
    Channels.hasMany(models.Messages);
  };
  return Channels;
};
