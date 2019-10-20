"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserChannel = sequelize.define(
    "UserChannel",
    {
      name: DataTypes.STRING
    },
    {}
  );
  UserChannel.associate = function(models) {
    User.belongsToMany(Channel, { through: UserChannel });
    Channel.belongsToMany(User, { through: UserChannel });
  };
  return UserChannel;
};
