import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ResetPasswordService from "../services/ResetPasswordService";
import sgMail from "@sendgrid/mail";
import Util from "../utils/Utils";

const util = new Util();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class ResetPasswordController {
  static async request(req, res) {
    if (!req.body.email || !req.body.url) {
      util.setError(400, "Please provide an email and a url");
      return util.send(res);
    }
    const { email, url } = req.body;
    const authorizedURLs = [
      "https://collaboracast-dev.herokuapp.com",
      "https://donnan.collaboracast.com",
      "http://localhost:3000"
    ];
    try {
      const user = await ResetPasswordService.getUser(email);
      if (user && authorizedURLs.includes(url)) {
        // Generate a unique secret
        const token_secret = user.password + user.createdAt.getTime();
        var token = jwt.sign(
          JSON.parse(JSON.stringify({ email: user.email })),
          token_secret,
          { expiresIn: 1200 }
        );

        const userWithResetToken = ResetPasswordService.updateUser(user.id, {
          reset_token: token
        });

        const msg = {
          to: user.email,
          from: "reset-password@collaboracast.com",
          subject: "Reset Password",
          html: `<p>A request to reset your password has been made. To reset your password, <a href="${url}/reset-password?email=${email}&token=${token}">click here</a></p>`
        };
        sgMail.send(msg);
        util.setSuccess(
          200,
          "Request for password reset is successful. Please check your email.",
          userWithResetToken
        );
      } else {
        let errorMessage;
        if (!user) {
          errorMessage = "User not found.";
        } else if (!authorizedURLs.includes(url)) {
          errorMessage = "URL is not authorized.";
        } else {
          errorMessage = "Password reset is unsuccessful.";
        }
        util.setError(400, errorMessage);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async reset(req, res) {
    if (!req.body.password || !req.params.email || !req.params.token) {
      util.setError(400, "Please provide a password, email and a valid token");
      return util.send(res);
    }
    const { password } = req.body;
    const { email, token } = req.params;
    try {
      const user = await ResetPasswordService.getUser(email);
      if (user && user.reset_token) {
        // Generate a unique secret
        const token_secret = user.password + user.createdAt.getTime();
        jwt.verify(token, token_secret);

        const dbpassword = bcrypt.hashSync(
          password,
          bcrypt.genSaltSync(10),
          null
        );

        const userWithNewPassword = ResetPasswordService.updateUser(user.id, {
          password: dbpassword,
          reset_token: null
        });

        const msg = {
          to: user.email,
          from: "reset-password@collaboracast.com",
          subject: "Reset Password Request",
          html: `<p>Your password was successfully reset.</p>`
        };
        sgMail.send(msg);
        util.setSuccess(
          200,
          "Password reset is successful.",
          userWithNewPassword
        );
      } else {
        util.setError(400, "Password reset was unsuccessful");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default ResetPasswordController;
