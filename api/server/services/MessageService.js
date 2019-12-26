import database from "../src/models";

class MessageService {
  static async getAllMessages() {
    try {
      return await database.Messages.findAll({
        include: [
          {
            model: database.Users,
            attributes: ["username"],
            include: [
              {
                model: database.Warehouse,
                attributes: ["name"]
              }
            ]
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
                attributes: ["username"],
                include: [
                  {
                    model: database.Warehouse,
                    attributes: ["name"]
                  }
                ]
              }
            ]
          },
          {
            model: database.Users,
            attributes: ["username"],
            include: [
              {
                model: database.Warehouse,
                attributes: ["name"]
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

  static async getMessagesByUser(userId) {
    try {
      const messagesByUser = await database.Messages.findAll({
        where: { UserId: Number(userId) },
        include: [
          {
            model: database.Users,
            attributes: ["username"],
            include: [
              {
                model: database.Warehouse,
                attributes: ["name"]
              }
            ]
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

      return messagesByUser;
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
            attributes: ["username"],
            include: [
              {
                model: database.Warehouse,
                attributes: ["name"]
              }
            ]
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

  static async getUserMessages(email) {
    const query = `SELECT 
          "Messages".*,
          "Users"."username",
          "Users"."WarehouseId",
          "Warehouses"."name" as "warehouseName",
          "Channels"."name" as "channelName",
	        COUNT("Comments"."id") AS "CommentCount" 
        FROM 
	        "Messages"
          JOIN "Users" ON "Messages"."UserId" = "Users"."id"
          LEFT OUTER JOIN "Warehouses" ON "Warehouses"."id" = "Users"."WarehouseId"
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
			        "email" = '${email}'
	        )
        GROUP BY 
	        "Messages"."id",
          "Users"."username",
          "Users"."WarehouseId",
          "Warehouses"."name",
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

  static async getNotifiedUsers(channelId) {
    const query = `SELECT
	                  "Users"."phone",
                    "Providers"."domain",
                    "Notifications"."type"
                  FROM 
                    "Notifications"
                  JOIN "Users" ON "Notifications"."UserId" = "Users"."id"
                  JOIN "Providers" ON "Providers"."id" = "Users"."ProviderId"
                  WHERE 
                    "Notifications"."ChannelId" = ${channelId}`;
    try {
      const messageNotifications = await database.sequelize.query(query, {
        type: database.sequelize.QueryTypes.SELECT
      });
      return messageNotifications.reduce((notifications, notification) => {
        if (notification.phone && notification.domain) {
          notifications.push({
            recipient:
              notification.phone.replace(/-/g, "") + "@" + notification.domain,
            type: notification.type
          });
        }
        return notifications;
      }, []);
    } catch (error) {
      throw error;
    }
  }
}

export default MessageService;
