import database from "../src/models";

class FeedService {
  static async getAllFeeds() {
    try {
      return await database.Feeds.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addFeed(newFeed) {
    try {
      return await database.Feeds.create(newFeed);
    } catch (error) {
      throw error;
    }
  }

  static async updateFeed(id, updateFeed) {
    try {
      const FeedToUpdate = await database.Feeds.findOne({
        where: { id: Number(id) }
      });

      if (FeedToUpdate) {
        await database.Feeds.update(updateFeed, { where: { id: Number(id) } });

        return updateFeed;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAFeed(id) {
    try {
      const theFeed = await database.Feeds.findOne({
        where: { id: Number(id) }
      });

      return theFeed;
    } catch (error) {
      throw error;
    }
  }

  static async deleteFeed(id) {
    try {
      const FeedToDelete = await database.Feeds.findOne({
        where: { id: Number(id) }
      });

      if (FeedToDelete) {
        const deletedFeed = await database.Feeds.destroy({
          where: { id: Number(id) }
        });
        return deletedFeed;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default FeedService;
