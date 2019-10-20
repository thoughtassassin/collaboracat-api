"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserFeed = sequelize.define(
    "UserFeed",
    {
      userId: DataTypes.STRING,
      feedlId: DataTypes.STRING
    },
    {}
  );
  UserFeed.associate = function(models) {
    models.Users.belongsToMany(models.Feeds, { through: UserFeed });
    models.Feeds.belongsToMany(models.Users, { through: UserFeed });
  };
  return UserFeed;
};
