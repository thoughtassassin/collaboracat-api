import RequestChannelService from "../services/RequestChannelService";
import sgMail from "@sendgrid/mail";
import Util from "../utils/Utils";

const util = new Util();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class RequestChannelController {
  static async requestChannel(req, res) {
    if (!req.body.name || !req.body.username) {
      util.setError(400, "Please provide a channel name and a username");
      return util.send(res);
    }
    const { name, username } = req.body;
    try {
      const adminUsers = await RequestChannelService.getAdminUsers();
      if (adminUsers.length > 0) {
        const msg = {
          to: adminUsers.map(adminUsers => adminUsers.email),
          from: "channel-requests@collaboracast.com",
          subject: "Channel Request",
          html: `<p>Channel Request: <strong>${name}</strong></p><p>From: ${username}</p>`
        };
        sgMail.send(msg);
        util.setSuccess(
          200,
          "Request for channel is successful.",
          adminUsers.data
        );
      } else {
        util.setSuccess(200, "No Admin Users found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default RequestChannelController;
