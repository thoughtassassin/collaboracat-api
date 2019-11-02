import database from "../src/models";

class LoginService {
  static async login(username) {
    try {
      return await database.Users.findOne({
        where: { username: username },
        include: [
          {
            model: database.Role,
            as: "Role",
            required: false,
            // Pass in the Feed attributes that you want to retrieve
            attributes: ["role"]
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }
}

export default LoginService;
