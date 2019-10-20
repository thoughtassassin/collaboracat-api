import database from "../src/models";

class UserService {
  static async getAllUsers() {
    try {
      return await database.Users.findAll();
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

  static async getAUser(id) {
    try {
      const theUser = await database.Users.findOne({
        where: { id: Number(id) }
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
