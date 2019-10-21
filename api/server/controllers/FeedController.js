import FeedService from "../services/FeedService";
import Util from "../utils/Utils";

const util = new Util();

class FeedController {
  static async getAllFeeds(req, res) {
    try {
      const allFeeds = await FeedService.getAllFeeds();
      if (allFeeds.length > 0) {
        util.setSuccess(200, "Feeds retrieved", allFeeds);
      } else {
        util.setSuccess(200, "No Feed found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addFeed(req, res) {
    if (!req.body.name) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newFeed = req.body;
    try {
      const createdFeed = await FeedService.addFeed(newFeed);
      util.setSuccess(201, "Feed Added!", createdFeed);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedFeed(req, res) {
    const alteredFeed = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateFeed = await FeedService.updateFeed(id, alteredFeed);
      if (!updateFeed) {
        util.setError(404, `Cannot find Feed with the id: ${id}`);
      } else {
        util.setSuccess(200, "Feed updated", updateFeed);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAFeed(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theFeed = await FeedService.getAFeed(id);

      if (!theFeed) {
        util.setError(404, `Cannot find Feed with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Feed", theFeed);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteFeed(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const FeedToDelete = await FeedService.deleteFeed(id);

      if (FeedToDelete) {
        util.setSuccess(200, "Feed deleted");
      } else {
        util.setError(404, `Feed with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default FeedController;
