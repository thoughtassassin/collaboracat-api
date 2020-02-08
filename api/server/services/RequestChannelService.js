import database from "../src/models";

class ChannelUserService {
  static async getAdminUsers(id) {
    try {
      const adminUsers = await database.Users.findAll({
        where: { RoleId: 1 },
        attributes: ["username", "email"]
      });

      return adminUsers;
    } catch (error) {
      throw error;
    }
  }
}

export default ChannelUserService;
