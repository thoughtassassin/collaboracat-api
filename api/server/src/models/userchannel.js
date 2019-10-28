"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserChannel = sequelize.define(
    "UserChannel",
    {
      UserId: DataTypes.STRING,
      ChannelId: DataTypes.STRING
    },
    {}
  );
  UserChannel.associate = function(models) {
    models.Users.belongsToMany(models.Channels, { through: UserChannel });
    models.Channels.belongsToMany(models.Users, { through: UserChannel });
  };
  return UserChannel;
};
