import FeedService from "./FeedService";
import database from "../src/models";
jest.mock("../src/models");

describe("FeedService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllFeeds", async () => {
    await FeedService.getAllFeeds();
    expect(database.Feeds.findAll).toHaveBeenCalled();
    try {
      database.Feeds.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await FeedService.getAllFeeds();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addFeed", async () => {
    await FeedService.addFeed("foo");
    expect(database.Feeds.create).toHaveBeenCalledWith("foo");
    try {
      database.Feeds.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await FeedService.addFeed("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateFeed", async () => {
    await FeedService.updateFeed(1, "foo");
    expect(database.Feeds.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Feeds.update).not.toBeCalled();

    database.Feeds.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await FeedService.updateFeed(1, "foo");
    expect(database.Feeds.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Feeds.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Feeds.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Feeds.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await FeedService.updateFeed(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAFeed", async () => {
    await FeedService.getAFeed(1);
    expect(database.Feeds.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Feeds.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await FeedService.getAFeed(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteFeed", async () => {
    await FeedService.deleteFeed(1);
    expect(database.Feeds.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Feeds.destroy).not.toBeCalled();

    database.Feeds.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await FeedService.deleteFeed(1);
    expect(database.Feeds.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Feeds.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Feeds.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Feeds.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await FeedService.deleteFeed(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
