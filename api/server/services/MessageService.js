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
            model: database.Channels,
            attributes: ["name"]
          },
          {
            model: database.Comments,
            include: [
              {
                model: database.Users,
                attributes: ["username"]
              }
            ]
          },
          {
            model: database.Users,
            attributes: ["username"]
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
            attributes: ["id"]
          },
          {
            model: database.Channels,
            attributes: ["name"]
          }
        ],
        order: [["createdAt", "DESC"]]
      });

      return channelMessages;
    } catch (error) {
      throw error;
    }
  }

  static async getUserMessages(username) {
    const query = `SELECT 
          "Messages".*, 
          "Users"."username",
          "Channels"."name" as "channelName",
	        COUNT("Comments"."id") AS "CommentCount" 
        FROM 
	        "Messages"
	        JOIN "Users" ON "Messages"."UserId" = "Users"."id"
	        LEFT OUTER JOIN "Comments" ON "Messages"."id" = "Comments"."MessageId"
	        LEFT OUTER JOIN "Channels" ON "Messages"."ChannelId" = "Channels"."id"
        WHERE 
	        "Messages"."ChannelId" IN (
		        SELECT 
			        "ChannelId"
		        FROM 
			        "Users" 
			      JOIN "UserChannels" ON "Users"."id" = "UserChannels"."UserId"
			      JOIN "Channels" ON "UserChannels"."ChannelId" = "Channels"."id" 
		        WHERE 
			        "username" = '${username}'
	        )
        GROUP BY 
	        "Messages"."id",
	        "Users"."username",
	        "Channels"."name"
        ORDER BY "Messages"."createdAt" DESC`;
    try {
      const userMessages = await database.sequelize.query(query, {
        type: database.sequelize.QueryTypes.SELECT
      });

      return userMessages;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageService;