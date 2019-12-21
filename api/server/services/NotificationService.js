import database from "../src/models";

class NotificationService {
  static async getAllNotifications() {
    try {
      return await database.Notification.findAll();
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
        where: { id: Number(id) }
      });

      if (NotificationToUpdate) {
        await database.Notification.update(updateNotification, {
          where: { id: Number(id) }
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
        where: { id: Number(id) }
      });

      return theNotification;
    } catch (error) {
      throw error;
    }
  }

  static async deleteNotification(id) {
    try {
      const NotificationToDelete = await database.Notification.findOne({
        where: { id: Number(id) }
      });

      if (NotificationToDelete) {
        const deletedNotification = await database.Notification.destroy({
          where: { id: Number(id) }
        });
        return deletedNotification;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default NotificationService;
