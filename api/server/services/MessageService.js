import database from "../src/models";

class MessageService {
  static async getAllMessages() {
    try {
      return await database.Messages.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addMessage(newMessage) {
    try {
      return await database.Messages.create(newMessage);
    } catch (error) {
      throw error;
    }
  }

  static async updateMessage(id, updateMessage) {
    try {
      const MessageToUpdate = await database.Messages.findOne({
        where: { id: Number(id) }
      });

      if (MessageToUpdate) {
        await database.Messages.update(updateMessage, {
          where: { id: Number(id) }
        });

        return updateMessage;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAMessage(id) {
    try {
      const theMessage = await database.Messages.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: database.Comments,
            include: [
              {
                model: database.Users,
                attributes: ["username"]
              }
            ]
          }
        ]
      });

      return theMessage;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMessage(id) {
    try {
      const MessageToDelete = await database.Messages.findOne({
        where: { id: Number(id) }
      });

      if (MessageToDelete) {
        const deletedMessage = await database.Messages.destroy({
          where: { id: Number(id) }
        });
        return deletedMessage;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getChannelMessages(ChannelId) {
    try {
      const channelMessages = await database.Messages.findAll({
        where: { ChannelId: Number(ChannelId) },
        include: [
          {
            model: database.Users,
            attributes: ["username"]
          },
          {
            model: database.Comments,
            attributes: []
          },
          {
            model: database.Channels,
            attributes: ["name"]
          }
        ],
        attributes: {
          include: [
            [
              database.sequelize.fn(
                "count",
                database.sequelize.col("Comments.id")
              ),
              "comments"
            ]
          ]
        },
        group: ["Messages.id", "User.id", "Channel.id", "Comments.id"],
        order: [["createdAt", "DESC"]]
      });

      return channelMessages;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageService;
