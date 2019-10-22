import database from "../src/models";

class ChannelService {
  static async getAllChannels() {
    try {
      return await database.Channels.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addChannel(newChannel) {
    try {
      return await database.Channels.create(newChannel);
    } catch (error) {
      throw error;
    }
  }

  static async updateChannel(id, updateChannel) {
    try {
      const ChannelToUpdate = await database.Channels.findOne({
        where: { id: Number(id) }
      });

      if (ChannelToUpdate) {
        await database.Channels.update(updateChannel, {
          where: { id: Number(id) }
        });

        return updateChannel;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAChannel(id) {
    try {
      const theChannel = await database.Channels.findOne({
        where: { id: Number(id) }
      });

      return theChannel;
    } catch (error) {
      throw error;
    }
  }

  static async deleteChannel(id) {
    try {
      const ChannelToDelete = await database.Channels.findOne({
        where: { id: Number(id) }
      });

      if (ChannelToDelete) {
        const deletedChannel = await database.Channels.destroy({
          where: { id: Number(id) }
        });
        return deletedChannel;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ChannelService;
