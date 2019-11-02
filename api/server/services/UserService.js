import database from "../src/models";

class UserService {
  static async getAllUsers() {
    try {
      return await database.Users.findAll({});
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      return await database.Users.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updateUser) {
    try {
      const UserToUpdate = await database.Users.findOne({
        where: { id: Number(id) }
      });

      if (UserToUpdate) {
        await database.Users.update(updateUser, { where: { id: Number(id) } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUser(username) {
    try {
      const theUser = await database.Users.findOne({
        where: { username: username },
        include: [
          {
            model: database.Feeds,
            as: "feeds",
            required: false,
            // Pass in the Feed attributes that you want to retrieve
            attributes: ["id", "name"],
            through: {
              // This block of code allows you to retrieve the properties of the join table
              model: database.UserFeeds,
              as: "UserFeeds",
              attributes: ["id", "name"]
            }
          },
          {
            model: database.Channels,
            as: "channels",
            required: false,
            // Pass in the Feed attributes that you want to retrieve
            attributes: ["id", "name"],
            through: {
              // This block of code allows you to retrieve the properties of the join table
              model: database.UserChannels,
              as: "UserChannels",
              attributes: ["id", "name"]
            }
          }
        ]
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const UserToDelete = await database.Users.findOne({
        where: { id: Number(id) }
      });

      if (UserToDelete) {
        const deletedUser = await database.Users.destroy({
          where: { id: Number(id) }
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
