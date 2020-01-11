"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      type: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      ChannelId: DataTypes.INTEGER
    },
    {}
  );
  Notification.associate = function(models) {
    Notification.belongsTo(models.Users);
    Notification.belongsTo(models.Channels);
  };
  return Notification;
};
