import database from "../src/models";

class UserFeedService {
  static async getAllUserFeeds() {
    try {
      return await database.UserFeed.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addUserFeed(newUserFeed) {
    try {
      console.log(database);
      return await database.UserFeed.create(newUserFeed);
    } catch (error) {
      throw error;
    }
  }

  static async updateUserFeed(id, updateUserFeed) {
    try {
      const UserFeedToUpdate = await database.UserFeed.findOne({
        where: { id: Number(id) }
      });

      if (UserFeedToUpdate) {
        await database.UserFeed.update(updateUserFeed, {
          where: { id: Number(id) }
        });

        return updateUserFeed;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUserFeed(id) {
    try {
      const theUserFeed = await database.UserFeed.findOne({
        where: { id: Number(id) }
      });

      return theUserFeed;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserFeed(id) {
    try {
      const UserFeedToDelete = await database.UserFeed.findOne({
        where: { id: Number(id) }
      });

      if (UserFeedToDelete) {
        const deletedUserFeed = await database.UserFeed.destroy({
          where: { id: Number(id) }
        });
        return deletedUserFeed;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserFeedService;
