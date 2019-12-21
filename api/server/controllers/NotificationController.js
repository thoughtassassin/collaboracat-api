import NotificationService from "../services/NotificationService";
import Util from "../utils/Utils";

const util = new Util();

class NotificationController {
  static async getAllNotifications(req, res) {
    try {
      const allNotifications = await NotificationService.getAllNotifications();
      if (allNotifications.length > 0) {
        util.setSuccess(200, "Notifications retrieved", allNotifications);
      } else {
        util.setSuccess(200, "No Notification found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addNotification(req, res) {
    if (!req.body.type | !req.body.UserId | !req.body.ChannelId) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newNotification = req.body;
    try {
      const createdNotification = await NotificationService.addNotification(
        newNotification
      );
      util.setSuccess(201, "Notification Added!", createdNotification);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedNotification(req, res) {
    console.log("update notifications");
    const alteredNotification = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateNotification = await NotificationService.updateNotification(
        id,
        alteredNotification
      );
      if (!updateNotification) {
        util.setError(404, `Cannot find Notification with the id: ${id}`);
      } else {
        util.setSuccess(200, "Notification updated", updateNotification);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getANotification(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theNotification = await NotificationService.getANotification(id);

      if (!theNotification) {
        util.setError(404, `Cannot find Notification with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Notification", theNotification);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteNotification(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const NotificationToDelete = await NotificationService.deleteNotification(
        id
      );

      if (NotificationToDelete) {
        util.setSuccess(200, "Notification deleted");
      } else {
        util.setError(404, `Notification with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default NotificationController;
