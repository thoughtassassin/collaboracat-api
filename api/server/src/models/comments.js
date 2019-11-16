"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      content: DataTypes.STRING
    },
    {}
  );
  Comments.associate = function(models) {
    Comments.belongsTo(models.Messages);
  };
  return Comments;
};
