import UserFeedService from "./UserFeedService";
import database from "../src/models";
jest.mock("../src/models");

describe("UserFeedService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllUserFeeds", async () => {
    await UserFeedService.getAllUserFeeds();
    expect(database.UserFeed.findAll).toHaveBeenCalledWith();
    try {
      database.UserFeed.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserFeedService.getAllUserFeeds();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addUserFeed", async () => {
    await UserFeedService.addUserFeed("foo");
    expect(database.UserFeed.create).toHaveBeenCalledWith("foo");
    try {
      database.UserFeed.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserFeedService.addUserFeed("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateUserFeed", async () => {
    await UserFeedService.updateUserFeed(1, "foo");
    expect(database.UserFeed.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.UserFeed.update).not.toBeCalled();

    database.UserFeed.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await UserFeedService.updateUserFeed(1, "foo");
    expect(database.UserFeed.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.UserFeed.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.UserFeed.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.UserFeed.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await UserFeedService.updateUserFeed(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAUserFeed", async () => {
    await UserFeedService.getAUserFeed(1);
    expect(database.UserFeed.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.UserFeed.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserFeedService.getAUserFeed(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteUserFeed", async () => {
    await UserFeedService.deleteUserFeed(1);
    expect(database.UserFeed.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.UserFeed.destroy).not.toBeCalled();

    database.UserFeed.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await UserFeedService.deleteUserFeed(1);
    expect(database.UserFeed.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.UserFeed.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.UserFeed.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.UserFeed.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await UserFeedService.deleteUserFeed(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
