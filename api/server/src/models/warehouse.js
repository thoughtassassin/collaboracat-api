'use strict';
module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('Warehouse', {
    name: DataTypes.STRING
  }, {});
  Warehouse.associate = function(models) {
    // associations can be defined here
  };
  return Warehouse;
};