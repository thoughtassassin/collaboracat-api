import UserChannelService from "../services/UserChannelService";
import Util from "../utils/Utils";

const util = new Util();

class UserChannelController {
  static async getAllUserChannels(req, res) {
    try {
      const allUserChannels = await UserChannelService.getAllUserChannels();
      if (allUserChannels.length > 0) {
        util.setSuccess(200, "UserChannels retrieved", allUserChannels);
      } else {
        util.setSuccess(200, "No UserChannel found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addUserChannel(req, res) {
    if (!req.body.ChannelId || !req.body.UserId) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newUserChannel = req.body;
    try {
      const createdUserChannel = await UserChannelService.addUserChannel(
        newUserChannel
      );
      util.setSuccess(201, "UserChannel Added!", createdUserChannel);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedUserChannel(req, res) {
    const alteredUserChannel = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateUserChannel = await UserChannelService.updateUserChannel(
        id,
        alteredUserChannel
      );
      if (!updateUserChannel) {
        util.setError(404, `Cannot find UserChannel with the id: ${id}`);
      } else {
        util.setSuccess(200, "UserChannel updated", updateUserChannel);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAUserChannel(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theUserChannel = await UserChannelService.getAUserChannel(id);

      if (!theUserChannel) {
        util.setError(404, `Cannot find UserChannel with the id ${id}`);
      } else {
        util.setSuccess(200, "Found UserChannel", theUserChannel);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteUserChannel(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const UserChannelToDelete = await UserChannelService.deleteUserChannel(
        id
      );

      if (UserChannelToDelete) {
        util.setSuccess(200, "UserChannel deleted");
      } else {
        util.setError(404, `UserChannel with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async removeUserChannel(req, res) {
    if (!req.body.ChannelId || !req.body.UserId) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const { ChannelId, UserId } = req.body;
    try {
      const createdUserChannel = await UserChannelService.removeUserChannel(
        ChannelId,
        UserId
      );
      util.setSuccess(201, "UserChannel Added!", createdUserChannel);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default UserChannelController;
