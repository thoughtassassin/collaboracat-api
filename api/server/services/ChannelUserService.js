import database from "../src/models";

class ChannelUserService {
  static async getChannelUsers(id) {
    try {
      const theChannelUsers = await database.Channels.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: database.Users,
            as: "users",
            required: false,
            attributes: ["id", "username", "email", "phone"],
            where: { archived: null },
            through: {
              model: database.UserChannels,
              as: "UserChannels",
              attributes: ["UserId", "ChannelId"],
            },
          },
        ],
      });

      return theChannelUsers;
    } catch (error) {
      throw error;
    }
  }
}

export default ChannelUserService;
