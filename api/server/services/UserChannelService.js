import database from "../src/models";

class UserChannelService {
  static async getAllUserChannels() {
    try {
      return await database.UserChannel.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addUserChannel(newUserChannel) {
    try {
      console.log(database);
      return await database.UserChannel.create(newUserChannel);
    } catch (error) {
      throw error;
    }
  }

  static async updateUserChannel(id, updateUserChannel) {
    try {
      const UserChannelToUpdate = await database.UserChannel.findOne({
        where: { id: Number(id) }
      });

      if (UserChannelToUpdate) {
        await database.UserChannel.update(updateUserChannel, {
          where: { id: Number(id) }
        });

        return updateUserChannel;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUserChannel(id) {
    try {
      const theUserChannel = await database.UserChannel.findOne({
        where: { id: Number(id) }
      });

      return theUserChannel;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserChannel(id) {
    try {
      const UserChannelToDelete = await database.UserChannel.findOne({
        where: { id: Number(id) }
      });

      if (UserChannelToDelete) {
        const deletedUserChannel = await database.UserChannel.destroy({
          where: { id: Number(id) }
        });
        return deletedUserChannel;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserChannelService;
