import LoginService from "../services/LoginService";
import jwt from "jsonwebtoken";
import Util from "../utils/Utils";

const util = new Util();

class LoginController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      util.setError(400, "Email and password are required");
      return util.send(res);
    }

    try {
      const user = await LoginService.login(email);
      if (!user) {
        util.setError(404, `User not found.`);
        return util.send(res);
      }
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          const loggedInUser = {
            id: user.dataValues.id,
            username: user.dataValues.username,
            email: user.dataValues.email,
            Role: { role: user.dataValues.Role.role }
          };
          var token = jwt.sign(
            JSON.parse(JSON.stringify(loggedInUser)),
            "nodeauthsecret",
            { expiresIn: 86400 * 30 }
          );
          jwt.verify(token, "nodeauthsecret", function(err, data) {
            console.log(err, data);
          });
          util.setSuccess(200, "Authenticated", token);
          return util.send(res);
        } else {
          console.log("failed");
          util.setError(401, "Authentication failed. Wrong password.");
          return util.send(res);
        }
      });
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default LoginController;
