import database from "../src/models";

class LoginService {
  static async login(email) {
    try {
      return await database.Users.findOne({
        where: { email: email, archived: null },
        include: [
          {
            model: database.Role,
            as: "Role",
            required: false,
            // Pass in the Feed attributes that you want to retrieve
            attributes: ["role"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
}

export default LoginService;
