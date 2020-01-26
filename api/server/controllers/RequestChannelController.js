import RequestChannelService from "../services/RequestChannelService";
import sgMail from "@sendgrid/mail";
import Util from "../utils/Utils";

const util = new Util();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class RequestChannelController {
  static async requestChannel(req, res) {
    if (!req.body.name) {
      util.setError(400, "Please provide a name");
      return util.send(res);
    }
    const { name } = req.body;
    try {
      const adminUsers = await RequestChannelService.getAdminUsers();
      if (adminUsers.length > 0) {
        const msg = {
          to: adminUsers.map(adminUsers => adminUsers.email),
          from: "channel-requests@collaboracast.com",
          subject: "Channel Request",
          html: `<p>Channel Request: <strong>${name}</strong></p>`
        };
        sgMail.send(msg);
        util.setSuccess(
          200,
          "Admin Users retrieved and email seent",
          adminUsers
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
