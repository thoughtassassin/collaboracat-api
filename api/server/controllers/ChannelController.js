import ChannelService from "../services/ChannelService";
import Util from "../utils/Utils";
import { read } from "fs";

const util = new Util();

class ChannelController {
  static async getAllChannels(req, res) {
    try {
      const allChannels = await ChannelService.getAllChannels();
      if (allChannels.length > 0) {
        util.setSuccess(200, "Channels retrieved", allChannels);
      } else {
        util.setSuccess(200, "No Channel found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addChannel(req, res) {
    if (!req.body.name || !req.body.FeedId) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newChannel = req.body;
    try {
      const createdChannel = await ChannelService.addChannel(newChannel);
      util.setSuccess(201, "Channel Added!", createdChannel);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedChannel(req, res) {
    const alteredChannel = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateChannel = await ChannelService.updateChannel(
        id,
        alteredChannel
      );
      if (!updateChannel) {
        util.setError(404, `Cannot find Channel with the id: ${id}`);
      } else {
        util.setSuccess(200, "Channel updated", updateChannel);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAChannel(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theChannel = await ChannelService.getAChannel(id);

      if (!theChannel) {
        util.setError(404, `Cannot find Channel with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Channel", theChannel);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteChannel(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const ChannelToDelete = await ChannelService.deleteChannel(id);

      if (ChannelToDelete) {
        util.setSuccess(200, "Channel deleted");
      } else {
        util.setError(404, `Channel with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default ChannelController;
