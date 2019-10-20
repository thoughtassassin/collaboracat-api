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
    // associations can be defined here
  };
  return Feeds;
};
