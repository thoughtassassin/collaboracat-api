import database from "../src/models";

class NotificationService {
  static async getAllNotifications() {
    try {
      return await database.Notification.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getAdminNotifications(userId) {
    const query = `SELECT
        "Channels"."id" AS "id", 
        "Channels"."name",
        "Notifications"."type",
        "Notifications"."id" AS "notificationId"
        FROM "Channels"
        LEFT JOIN "Notifications" ON "Notifications"."ChannelId" = "Channels"."id" 
  	        AND "Notifications"."UserId" = :userId
        ORDER BY "Channels"."name" ASC`;
    try {
      const adminNotifications = await database.sequelize.query(query, {
        replacements: { userId },
        type: database.sequelize.QueryTypes.SELECT,
      });

      return adminNotifications;
    } catch (error) {
      throw error;
    }
  }

  static async getUserNotifications(userId) {
    const query = `SELECT
        "Channels"."id" AS "id", 
        "Channels"."name",
        "Notifications"."type",
        "Notifications"."id" AS "notificationId"
        FROM "Channels"
        JOIN "UserChannels" ON "UserChannels"."ChannelId" = "Channels"."id" AND "UserChannels"."UserId" = ${userId}
        LEFT JOIN "Notifications" ON "Notifications"."ChannelId" = "Channels"."id" 
  	        AND "Notifications"."UserId" = :userId
        ORDER BY "Channels"."name" ASC`;
    try {
      const adminNotifications = await database.sequelize.query(query, {
        replacements: { userId },
        type: database.sequelize.QueryTypes.SELECT,
      });

      return adminNotifications;
    } catch (error) {
      throw error;
    }
  }

  static async addNotification(newNotification) {
    try {
      return await database.Notification.create(newNotification);
    } catch (error) {
      throw error;
    }
  }

  static async updateNotification(id, updateNotification) {
    try {
      const NotificationToUpdate = await database.Notification.findOne({
        where: { id: Number(id) },
      });

      if (NotificationToUpdate) {
        await database.Notification.update(updateNotification, {
          where: { id: Number(id) },
        });

        return updateNotification;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getANotification(id) {
    try {
      const theNotification = await database.Notification.findOne({
        where: { id: Number(id) },
      });

      return theNotification;
    } catch (error) {
      throw error;
    }
  }

  static async deleteNotification(id) {
    try {
      const NotificationToDelete = await database.Notification.findOne({
        where: { id: Number(id) },
      });

      if (NotificationToDelete) {
        const deletedNotification = await database.Notification.destroy({
          where: { id: Number(id) },
        });
        return deletedNotification;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async setAllNotificationsForUser(userId, type, userType) {
    let query;
    if (userType === "representative") {
      query = `INSERT INTO "Notifications" 
              ("ChannelId", 
                "UserId", 
                type, 
                "createdAt", 
                "updatedAt")
                (SELECT 
                "Channels"."id" AS "ChannelId", 
                :userId AS "UserId", 
                :type AS type,
                now() AS "createdAt", 
                  now() AS "updatedAt" 
              FROM "Channels"
              JOIN "UserChannels" 
                ON "UserChannels"."ChannelId" = "Channels"."id" 
                AND "UserChannels"."UserId" = :userId)`;
    } else {
      query = `INSERT INTO "Notifications" 
              ("ChannelId", 
                "UserId", 
                type, 
                "createdAt", 
                "updatedAt")
              (SELECT 
                id AS "ChannelId", 
                :userId AS "UserId",
                :type AS "type", 
                now() AS "createdAt", 
                now() AS updatedAt 
                from "Channels")`;
    }
    try {
      await this.deleteAllNotificationsForUser(userId);
      const insertedNotifications = await database.sequelize.query(query, {
        replacements: { userId, type },
        type: database.sequelize.QueryTypes.SELECT,
      });
      return insertedNotifications;
    } catch (error) {
      throw error;
    }
  }
  static async deleteAllNotificationsForUser(userId) {
    const query = `DELETE FROM "Notifications" WHERE "UserId" = ${userId};`;
    try {
      const deletedNotifications = await database.sequelize.query(query, {
        type: database.sequelize.QueryTypes.SELECT,
      });

      return deletedNotifications;
    } catch (error) {
      throw error;
    }
  }
}

export default NotificationService;
