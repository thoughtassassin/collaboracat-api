import UserFeedController from "./UserFeedController";
import UserFeedService from "../services/UserFeedService";
import { res } from "../utils/Test";
jest.mock("../services/UserFeedService");

describe("UserFeedController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllUserFeeds", async () => {
    // no UserFeeds
    UserFeedService.getAllUserFeeds.mockImplementationOnce(() => []);
    await UserFeedController.getAllUserFeeds(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No UserFeed found",
      status: "success",
    });

    // UserFeeds
    UserFeedService.getAllUserFeeds.mockImplementationOnce(() => [
      { UserFeed: "foo" },
      { UserFeed: "bar" },
    ]);
    await UserFeedController.getAllUserFeeds(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ UserFeed: "foo" }, { UserFeed: "bar" }],
      message: "UserFeeds retrieved",
      status: "success",
    });

    // error
    UserFeedService.getAllUserFeeds.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserFeedController.getAllUserFeeds(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("addUserFeed", async () => {
    // missing FeedId in request
    await UserFeedController.addUserFeed(
      {
        body: {
          UserId: "1",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // missing UserId in request
    await UserFeedController.addUserFeed(
      {
        body: {
          UserId: "1",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // add UserFeed
    UserFeedService.addUserFeed.mockImplementationOnce(() => ({
      UserId: "1",
      FeedId: "1",
    }));
    await UserFeedController.addUserFeed(
      { body: { UserId: "1", FeedId: "1" } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { UserId: "1", FeedId: "1" },
      message: "UserFeed Added!",
      status: "success",
    });

    // error
    UserFeedService.addUserFeed.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserFeedController.addUserFeed(
      { body: { UserId: "1", FeedId: "1" } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedUserFeed", async () => {
    // missing name in request
    await UserFeedController.updatedUserFeed({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // UserFeed not found
    UserFeedService.updateUserFeed.mockImplementationOnce(() => null);
    await UserFeedController.updatedUserFeed(
      {
        body: { UserId: "1", FeedId: "1" },
        params: { id: 2 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find UserFeed with the id: 2",
      status: "error",
    });

    // update UserFeed
    UserFeedService.updateUserFeed.mockImplementationOnce(() => ({
      UserId: "1",
      FeedId: "1",
    }));
    await UserFeedController.updatedUserFeed(
      {
        body: { UserId: "1", FeedId: "1" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { UserId: "1", FeedId: "1" },
      message: "UserFeed updated",
      status: "success",
    });

    // error
    UserFeedService.updateUserFeed.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserFeedController.updatedUserFeed(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getAUserFeed", async () => {
    // missing id in request
    await UserFeedController.getAUserFeed({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // UserFeed not found
    UserFeedService.getAUserFeed.mockImplementationOnce(() => null);
    await UserFeedController.getAUserFeed(
      {
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find UserFeed with the id 3",
      status: "error",
    });

    // get UserFeed
    UserFeedService.getAUserFeed.mockImplementationOnce(() => ({
      UserId: "1",
      FeedId: "1",
    }));
    await UserFeedController.getAUserFeed(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { UserId: "1", FeedId: "1" },
      message: "Found UserFeed",
      status: "success",
    });

    // error
    UserFeedService.getAUserFeed.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await UserFeedController.getAUserFeed({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
  test("deleteUserFeed", async () => {
    // missing id in request
    await UserFeedController.deleteUserFeed({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // UserFeed not found
    UserFeedService.deleteUserFeed.mockImplementationOnce(() => null);
    await UserFeedController.deleteUserFeed(
      {
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "UserFeed with the id 3 cannot be found",
      status: "error",
    });

    // delete UserFeed
    UserFeedService.deleteUserFeed.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await UserFeedController.deleteUserFeed(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "UserFeed deleted",
      status: "success",
    });

    // error
    UserFeedService.deleteUserFeed.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await UserFeedController.deleteUserFeed({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
});
