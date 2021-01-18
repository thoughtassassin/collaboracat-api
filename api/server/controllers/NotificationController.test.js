import NotificationController from "./NotificationController";
import NotificationService from "../services/NotificationService";
import { res } from "../utils/Test";
jest.mock("../services/NotificationService");

describe("NotificationController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllNotifications", async () => {
    //no notifications
    NotificationService.getAllNotifications.mockImplementationOnce(() => []);
    await NotificationController.getAllNotifications(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Notification found",
      status: "success",
    });

    //notifications
    NotificationService.getAllNotifications.mockImplementationOnce(() => [
      { UserId: 1, type: "all" },
      { UserId: 2, type: "priority" },
    ]);
    await NotificationController.getAllNotifications(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [
        { UserId: 1, type: "all" },
        { UserId: 2, type: "priority" },
      ],
      message: "Notifications retrieved",
      status: "success",
    });

    // error
    NotificationService.getAllNotifications.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await NotificationController.getAllNotifications(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getAdminNotifications", async () => {
    //no user id
    await NotificationController.getAdminNotifications({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid user id",
      status: "error",
    });

    //notifications
    NotificationService.getAdminNotifications.mockImplementationOnce(() => [
      { ChannelId: 1, type: "all" },
      {
        ChannelId: 2,
        type: "priority",
      },
    ]);
    await NotificationController.getAdminNotifications(
      { params: { userId: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: [
        { ChannelId: 1, type: "all" },
        {
          ChannelId: 2,
          type: "priority",
        },
      ],
      message: "Found Notifications",
      status: "success",
    });

    // no notifications
    NotificationService.getAdminNotifications.mockImplementationOnce(
      () => null
    );
    await NotificationController.getAdminNotifications(
      { params: { userId: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Notifications with the id 1",
      status: "error",
    });

    // error
    NotificationService.getAdminNotifications.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await NotificationController.getAdminNotifications(
      { params: { userId: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getUserNotifications", async () => {
    //no user id
    await NotificationController.getUserNotifications({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid user id",
      status: "error",
    });

    //notifications
    NotificationService.getUserNotifications.mockImplementationOnce(() => [
      { ChannelId: 1, type: "all" },
      {
        ChannelId: 2,
        type: "priority",
      },
    ]);
    await NotificationController.getUserNotifications(
      { params: { userId: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: [
        { ChannelId: 1, type: "all" },
        {
          ChannelId: 2,
          type: "priority",
        },
      ],
      message: "Found Notifications",
      status: "success",
    });

    // no notifications
    NotificationService.getUserNotifications.mockImplementationOnce(() => null);
    await NotificationController.getUserNotifications(
      { params: { userId: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Notifications with the id 1",
      status: "error",
    });

    // error
    NotificationService.getUserNotifications.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await NotificationController.getUserNotifications(
      { params: { userId: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("addNotification", async () => {
    // no type
    await NotificationController.addNotification(
      {
        body: {
          UserId: 1,
          ChannelId: 1,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no UserId
    await NotificationController.addNotification(
      {
        body: {
          type: "all",
          ChannelId: 1,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no ChannelId
    await NotificationController.addNotification(
      {
        body: {
          type: "all",
          UserId: 1,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // add notification
    NotificationService.addNotification.mockImplementationOnce(() => ({
      type: "all",
      UserId: 1,
      ChannelId: 1,
    }));
    await NotificationController.addNotification(
      {
        body: {
          type: "all",
          UserId: 1,
          ChannelId: 1,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: {
        type: "all",
        UserId: 1,
        ChannelId: 1,
      },
      message: "Notification Added!",
      status: "success",
    });

    // error
    NotificationService.addNotification.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await NotificationController.addNotification(
      {
        body: {
          type: "all",
          UserId: 1,
          ChannelId: 1,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedNotification", async () => {
    // no id
    await NotificationController.updatedNotification(
      {
        body: {
          UserId: 1,
          ChannelId: 1,
        },
        params: {},
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // cannot find notification
    NotificationService.updateNotification.mockImplementationOnce(() => null);
    await NotificationController.updatedNotification(
      {
        body: {
          type: "all",
          UserId: 1,
          ChannelId: 1,
        },
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Notification with the id: 1",
      status: "error",
    });

    // update notification
    NotificationService.updateNotification.mockImplementationOnce(() => ({
      type: "all",
      UserId: 1,
      ChannelId: 1,
    }));
    await NotificationController.updatedNotification(
      {
        body: {
          type: "all",
          UserId: 1,
          ChannelId: 1,
        },
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: {
        type: "all",
        UserId: 1,
        ChannelId: 1,
      },
      message: "Notification updated",
      status: "success",
    });

    // error
    NotificationService.updateNotification.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await NotificationController.updatedNotification(
      {
        body: {
          type: "all",
          UserId: 1,
          ChannelId: 1,
        },
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getANotification", async () => {
    // no id
    await NotificationController.getANotification(
      {
        body: {
          UserId: 1,
          ChannelId: 1,
        },
        params: {},
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // cannot find notification
    NotificationService.getANotification.mockImplementationOnce(() => null);
    await NotificationController.getANotification(
      {
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Notification with the id 1",
      status: "error",
    });

    // get notification
    NotificationService.getANotification.mockImplementationOnce(() => ({
      type: "all",
      UserId: 1,
      ChannelId: 1,
    }));
    await NotificationController.getANotification(
      {
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: {
        type: "all",
        UserId: 1,
        ChannelId: 1,
      },
      message: "Found Notification",
      status: "success",
    });

    // error
    NotificationService.getANotification.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await NotificationController.getANotification(
      {
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("deleteNotification", async () => {
    // no id
    await NotificationController.deleteNotification(
      {
        params: {},
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // cannot find notification
    NotificationService.deleteNotification.mockImplementationOnce(() => null);
    await NotificationController.deleteNotification(
      {
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Notification with the id 1 cannot be found",
      status: "error",
    });

    // get notification
    NotificationService.deleteNotification.mockImplementationOnce(() => ({
      type: "all",
      UserId: 1,
      ChannelId: 1,
    }));
    await NotificationController.deleteNotification(
      {
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Notification deleted",
      status: "success",
    });

    // error
    NotificationService.deleteNotification.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await NotificationController.deleteNotification(
      {
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("setAllUserNotifications", async () => {
    // no type
    await NotificationController.setAllUserNotifications(
      {
        body: {
          userType: "admin",
        },
        params: {},
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no userType
    await NotificationController.setAllUserNotifications(
      {
        body: {
          type: "all",
        },
        params: {},
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // update none
    await NotificationController.setAllUserNotifications(
      {
        body: {
          type: "none",
          userType: "admin",
        },
        params: { userId: 1 },
      },
      res
    );
    expect(
      NotificationService.deleteAllNotificationsForUser
    ).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "Notifications Set!",
      status: "success",
    });

    // update all
    await NotificationController.setAllUserNotifications(
      {
        body: {
          type: "all",
          userType: "admin",
        },
        params: { userId: 1 },
      },
      res
    );
    expect(NotificationService.setAllNotificationsForUser).toHaveBeenCalledWith(
      1,
      "all",
      "admin"
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Notifications Set!",
      status: "success",
    });

    // error
    NotificationService.setAllNotificationsForUser.mockImplementationOnce(
      () => {
        throw new Error("foo");
      }
    );
    await NotificationController.setAllUserNotifications(
      {
        body: {
          type: "all",
          userType: "admin",
        },
        params: { userId: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
