import bcrypt from "bcrypt";
("use strict");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      reset_token: DataTypes.STRING,
      archived: {
        type: DataTypes.BOOLEAN
      }
    },
    {}
  );
  Users.beforeSave((user, options) => {
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });
  Users.prototype.comparePassword = function(passw, cb) {
    const password = this.password;
    bcrypt.compare(passw, password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  Users.associate = function(models) {
    Users.belongsTo(models.Role);
    Users.belongsToMany(models.Feeds, {
      through: "UserFeeds",
      as: "feeds",
      foreignKey: "UserId",
      otherKey: "FeedId"
    });
    Users.belongsToMany(models.Channels, {
      through: "UserChannels",
      as: "channels",
      foreignKey: "UserId",
      otherKey: "ChannelId"
    });
    Users.belongsTo(models.Warehouse);
    Users.belongsTo(models.Provider);
  };
  return Users;
};
