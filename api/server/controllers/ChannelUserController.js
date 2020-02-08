import ChannelUserService from "../services/ChannelUserService";
import Util from "../utils/Utils";

const util = new Util();

class ChannelUserController {
  static async getChannelUsers(req, res) {
    const { channelid } = req.params;

    if (!Number(channelid)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theChannelUsers = await ChannelUserService.getChannelUsers(
        channelid
      );

      if (!theChannelUsers) {
        util.setError(
          404,
          `Cannot find ChannelUsers with the channel id ${id}`
        );
      } else {
        util.setSuccess(200, "Found Channel Users", theChannelUsers);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default ChannelUserController;
