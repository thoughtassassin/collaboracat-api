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
    Users.hasOne(models.Role);
    Users.hasMany(models.Feeds);
    Users.hasMany(models.Channels);
  };
  return Users;
};
