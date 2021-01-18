import FeedController from "./FeedController";
import FeedService from "../services/FeedService";
import { res } from "../utils/Test";
jest.mock("../services/FeedService");

describe("FeedController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllFeeds", async () => {
    // no feeds
    FeedService.getAllFeeds.mockImplementationOnce(() => []);
    await FeedController.getAllFeeds(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Feed found",
      status: "success",
    });

    // feeds
    FeedService.getAllFeeds.mockImplementationOnce(() => [
      { name: "foo" },
      { name: "bar" },
    ]);
    await FeedController.getAllFeeds(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ name: "foo" }, { name: "bar" }],
      message: "Feeds retrieved",
      status: "success",
    });

    // error
    FeedService.getAllFeeds.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await FeedController.getAllFeeds(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("addFeed", async () => {
    // missing name in request
    await FeedController.addFeed({ body: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // add feed
    FeedService.addFeed.mockImplementationOnce(() => ({ name: "foo" }));
    await FeedController.addFeed({ body: { name: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Feed Added!",
      status: "success",
    });

    // error
    FeedService.addFeed.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await FeedController.addFeed({ body: { name: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedFeed", async () => {
    // missing name in request
    await FeedController.updatedFeed({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // feed not found
    FeedService.updateFeed.mockImplementationOnce(() => null);
    await FeedController.updatedFeed(
      {
        body: { name: "foo" },
        params: { id: 2 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Feed with the id: 2",
      status: "error",
    });

    // update feed
    FeedService.updateFeed.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await FeedController.updatedFeed(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Feed updated",
      status: "success",
    });

    // error
    FeedService.updateFeed.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await FeedController.updatedFeed(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getAFeed", async () => {
    // missing id in request
    await FeedController.getAFeed({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // feed not found
    FeedService.getAFeed.mockImplementationOnce(() => null);
    await FeedController.getAFeed(
      {
        body: { name: "foo" },
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Feed with the id 3",
      status: "error",
    });

    // get feed
    FeedService.getAFeed.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await FeedController.getAFeed(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Found Feed",
      status: "success",
    });

    // error
    FeedService.getAFeed.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await FeedController.getAFeed(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
  test("deleteFeed", async () => {
    // missing id in request
    await FeedController.deleteFeed({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // feed not found
    FeedService.deleteFeed.mockImplementationOnce(() => null);
    await FeedController.deleteFeed(
      {
        body: { name: "foo" },
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Feed with the id 3 cannot be found",
      status: "error",
    });

    // delete feed
    FeedService.deleteFeed.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await FeedController.deleteFeed(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Feed deleted",
      status: "success",
    });

    // error
    FeedService.deleteFeed.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await FeedController.deleteFeed(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
});
