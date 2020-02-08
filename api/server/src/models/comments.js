"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      content: DataTypes.TEXT
    },
    {}
  );
  Comments.associate = function(models) {
    Comments.belongsTo(models.Messages);
    Comments.belongsTo(models.Users);
  };
  return Comments;
};
