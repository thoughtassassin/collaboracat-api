import database from "../src/models";

class LoginService {
  static async login(username) {
    try {
      return await database.Users.findOne({
        where: { username: username }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default LoginService;
