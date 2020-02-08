import database from "../src/models";

class ResetPasswordService {
  static async getUser(email) {
    try {
      return await database.Users.findOne({
        where: { email: email }
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updates) {
    try {
      const UserToUpdate = await database.Users.findOne({
        where: { id: Number(id) }
      });
      if (UserToUpdate) {
        const updatedUser = await database.Users.update(updates, {
          where: { id: Number(id) }
        });
        return updatedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ResetPasswordService;
