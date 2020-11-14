import database from "../src/models";

class RequestChannelService {
  static async getAdminUsers() {
    try {
      const adminUsers = await database.Users.findAll({
        where: { RoleId: 1 },
        attributes: ["username", "email"],
      });

      return adminUsers;
    } catch (error) {
      throw error;
    }
  }
}

export default RequestChannelService;
