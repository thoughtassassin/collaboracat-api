"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define(
    "Contacts",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      business: DataTypes.STRING,
      phone: DataTypes.STRING,
      address1: DataTypes.STRING,
      address2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.INTEGER,
      email: DataTypes.STRING
    },
    {}
  );
  Contacts.associate = function(models) {
    Contacts.belongsTo(models.Channels);
  };
  return Contacts;
};
