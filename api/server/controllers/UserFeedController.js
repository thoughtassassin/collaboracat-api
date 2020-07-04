import UserFeedService from "../services/UserFeedService";
import Util from "../utils/Utils";

const util = new Util();

class UserFeedController {
  static async getAllUserFeeds(req, res) {
    try {
      const allUserFeeds = await UserFeedService.getAllUserFeeds();
      if (allUserFeeds.length > 0) {
        util.setSuccess(200, "UserFeeds retrieved", allUserFeeds);
      } else {
        util.setSuccess(200, "No UserFeed found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async addUserFeed(req, res) {
    if (!req.body.FeedId || !req.body.UserId) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newUserFeed = req.body;
    try {
      const createdUserFeed = await UserFeedService.addUserFeed(newUserFeed);
      util.setSuccess(201, "UserFeed Added!", createdUserFeed);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedUserFeed(req, res) {
    const alteredUserFeed = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateUserFeed = await UserFeedService.updateUserFeed(
        id,
        alteredUserFeed
      );
      if (!updateUserFeed) {
        util.setError(404, `Cannot find UserFeed with the id: ${id}`);
      } else {
        util.setSuccess(200, "UserFeed updated", updateUserFeed);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async getAUserFeed(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theUserFeed = await UserFeedService.getAUserFeed(id);

      if (!theUserFeed) {
        util.setError(404, `Cannot find UserFeed with the id ${id}`);
      } else {
        util.setSuccess(200, "Found UserFeed", theUserFeed);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteUserFeed(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const UserFeedToDelete = await UserFeedService.deleteUserFeed(id);

      if (UserFeedToDelete) {
        util.setSuccess(200, "UserFeed deleted");
      } else {
        util.setError(404, `UserFeed with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default UserFeedController;
