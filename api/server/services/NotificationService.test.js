import NotificationService from "./NotificationService";
import database from "../src/models";
jest.mock("../src/models");

describe("NotificationService", () => {
  afterEach(() => jest.clearAllMocks());
  test("getAllNotifications", async () => {
    await NotificationService.getAllNotifications();
    expect(database.Notification.findAll).toHaveBeenCalled();
    try {
      database.Notification.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await NotificationService.getAllNotifications();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAdminNotifications", async () => {
    await NotificationService.getAdminNotifications(1);
    expect(database.sequelize.query).toHaveBeenCalledWith(
      `SELECT
        "Channels"."id" AS "id", 
        "Channels"."name",
        "Notifications"."type",
        "Notifications"."id" AS "notificationId"
        FROM "Channels"
        LEFT JOIN "Notifications" ON "Notifications"."ChannelId" = "Channels"."id" 
  	        AND "Notifications"."UserId" = :userId
        ORDER BY "Channels"."name" ASC`,
      {
        replacements: { userId: 1 },
        type: database.sequelize.QueryTypes.SELECT,
      }
    );
    try {
      database.sequelize.query.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await NotificationService.getAdminNotifications(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getUserNotifications", async () => {
    await NotificationService.getUserNotifications(1);
    expect(database.sequelize.query).toHaveBeenCalledWith(
      `SELECT
        "Channels"."id" AS "id", 
        "Channels"."name",
        "Notifications"."type",
        "Notifications"."id" AS "notificationId"
        FROM "Channels"
        JOIN "UserChannels" ON "UserChannels"."ChannelId" = "Channels"."id" AND "UserChannels"."UserId" = 1
        LEFT JOIN "Notifications" ON "Notifications"."ChannelId" = "Channels"."id" 
  	        AND "Notifications"."UserId" = :userId
        ORDER BY "Channels"."name" ASC`,
      {
        replacements: { userId: 1 },
        type: database.sequelize.QueryTypes.SELECT,
      }
    );
    try {
      database.sequelize.query.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await NotificationService.getUserNotifications(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addNotification", async () => {
    await NotificationService.addNotification("foo");
    expect(database.Notification.create).toHaveBeenCalledWith("foo");
    try {
      database.Notification.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await NotificationService.addNotification("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateNotification", async () => {
    await NotificationService.updateNotification(1, "foo");
    expect(database.Notification.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Notification.update).not.toBeCalled();

    database.Notification.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await NotificationService.updateNotification(1, "foo");
    expect(database.Notification.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Notification.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Notification.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Notification.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await NotificationService.updateNotification(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getANotification", async () => {
    await NotificationService.getANotification(1);
    expect(database.Notification.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Notification.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await NotificationService.getANotification(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteNotification", async () => {
    await NotificationService.deleteNotification(1);
    expect(database.Notification.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Notification.destroy).not.toBeCalled();

    database.Notification.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await NotificationService.deleteNotification(1);
    expect(database.Notification.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Notification.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Notification.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Notification.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await NotificationService.deleteNotification(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("setAllNotificationsForUser", async () => {
    await NotificationService.setAllNotificationsForUser(
      1,
      "all",
      "representative"
    );
    await NotificationService.setAllNotificationsForUser(
      1,
      "priority",
      "manager"
    );
    expect(database.sequelize.query).toHaveBeenCalledTimes(4);
    expect(database.sequelize.query.mock.calls[0]).toEqual([
      'DELETE FROM "Notifications" WHERE "UserId" = 1;',
      { type: "SELECT" },
    ]);
    expect(database.sequelize.query.mock.calls[1]).toEqual([
      `INSERT INTO "Notifications" 
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
                AND "UserChannels"."UserId" = :userId)`,
      { replacements: { type: "all", userId: 1 }, type: "SELECT" },
    ]);
    expect(database.sequelize.query.mock.calls[2]).toEqual([
      'DELETE FROM "Notifications" WHERE "UserId" = 1;',
      { type: "SELECT" },
    ]);
    expect(database.sequelize.query.mock.calls[3]).toEqual([
      `INSERT INTO "Notifications" 
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
                from "Channels")`,
      { replacements: { type: "priority", userId: 1 }, type: "SELECT" },
    ]);
    try {
      database.sequelize.query.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await NotificationService.setAllNotificationsForUser(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteAllNotificationsForUser", async () => {
    await NotificationService.deleteAllNotificationsForUser(1);
    expect(database.sequelize.query).toHaveBeenCalledWith(
      `DELETE FROM "Notifications" WHERE "UserId" = 1;`,
      {
        type: database.sequelize.QueryTypes.SELECT,
      }
    );
    try {
      database.sequelize.query.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await NotificationService.deleteAllNotificationsForUser(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
