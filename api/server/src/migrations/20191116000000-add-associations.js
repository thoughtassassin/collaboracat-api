module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Comments", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Comments", // name of the Target model
      "UserId" // key we want to remove
    );
  }
};
