"use strict";
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "Messages",
    {
      content: DataTypes.STRING
    },
    {}
  );
  Messages.associate = function(models) {
    Messages.belongsTo(models.Users);
    Messages.belongsTo(models.Channels);
    Messages.hasMany(models.Comments);
  };
  return Messages;
};
