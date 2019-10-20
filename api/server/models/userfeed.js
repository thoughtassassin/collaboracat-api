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
    User.belongsToMany(Feed, { through: UserFeed });
    Feed.belongsToMany(User, { through: UserFeed });
  };
  return UserFeed;
};
