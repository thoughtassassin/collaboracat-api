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
    Channels.belongsTo(models.Feed);
  };
  return Channels;
};
