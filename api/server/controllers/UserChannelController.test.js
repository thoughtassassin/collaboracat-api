import UserChannelController from "./UserChannelController";
import UserChannelService from "../services/UserChannelService";
import { res } from "../utils/Test";
jest.mock("../services/UserChannelService");

describe("UserChannelController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllUserChannels", async () => {
    // no UserChannels
    UserChannelService.getAllUserChannels.mockImplementationOnce(() => []);
    await UserChannelController.getAllUserChannels(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No UserChannel found",
      status: "success",
    });

    // UserChannels
    UserChannelService.getAllUserChannels.mockImplementationOnce(() => [
      { name: "foo" },
      { name: "bar" },
    ]);
    await UserChannelController.getAllUserChannels(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ name: "foo" }, { name: "bar" }],
      message: "UserChannels retrieved",
      status: "success",
    });

    // error
    UserChannelService.getAllUserChannels.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserChannelController.getAllUserChannels(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("addUserChannel", async () => {
    // missing ChannelId
    await UserChannelController.addUserChannel(
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

    // missing UserId
    await UserChannelController.addUserChannel(
      {
        body: {
          ChannelId: "1",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // add UserChannel
    UserChannelService.addUserChannel.mockImplementationOnce(() => ({
      UserId: "1",
      ChannelId: "1",
    }));
    await UserChannelController.addUserChannel(
      { body: { UserId: "1", ChannelId: "1" } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { UserId: "1", ChannelId: "1" },
      message: "UserChannel Added!",
      status: "success",
    });

    // error
    UserChannelService.addUserChannel.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserChannelController.addUserChannel(
      { body: { UserId: "1", ChannelId: "1" } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedUserChannel", async () => {
    // missing name in request
    await UserChannelController.updatedUserChannel(
      { body: {}, params: {} },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // UserChannel not found
    UserChannelService.updateUserChannel.mockImplementationOnce(() => null);
    await UserChannelController.updatedUserChannel(
      {
        body: { name: "foo" },
        params: { id: 2 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find UserChannel with the id: 2",
      status: "error",
    });

    // update UserChannel
    UserChannelService.updateUserChannel.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await UserChannelController.updatedUserChannel(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "UserChannel updated",
      status: "success",
    });

    // error
    UserChannelService.updateUserChannel.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserChannelController.updatedUserChannel(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getAUserChannel", async () => {
    // missing id in request
    await UserChannelController.getAUserChannel({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // UserChannel not found
    UserChannelService.getAUserChannel.mockImplementationOnce(() => null);
    await UserChannelController.getAUserChannel(
      {
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find UserChannel with the id 3",
      status: "error",
    });

    // get UserChannel
    UserChannelService.getAUserChannel.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await UserChannelController.getAUserChannel(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Found UserChannel",
      status: "success",
    });

    // error
    UserChannelService.getAUserChannel.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await UserChannelController.getAUserChannel({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
  test("deleteUserChannel", async () => {
    // missing id in request
    await UserChannelController.deleteUserChannel({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // UserChannel not found
    UserChannelService.deleteUserChannel.mockImplementationOnce(() => null);
    await UserChannelController.deleteUserChannel(
      {
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "UserChannel with the id 3 cannot be found",
      status: "error",
    });

    // delete UserChannel
    UserChannelService.deleteUserChannel.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await UserChannelController.deleteUserChannel(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "UserChannel deleted",
      status: "success",
    });

    // error
    UserChannelService.deleteUserChannel.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await UserChannelController.deleteUserChannel({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
  test("removeUserChannel", async () => {
    // missing ChannelId
    await UserChannelController.removeUserChannel(
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

    // missing UserId
    await UserChannelController.removeUserChannel(
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

    // delete UserChannel
    UserChannelService.removeUserChannel.mockImplementationOnce(() => ({
      UserId: "1",
      ChannelId: "1",
    }));
    await UserChannelController.removeUserChannel(
      {
        body: {
          UserId: "1",
          ChannelId: "1",
        },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: {
        UserId: "1",
        ChannelId: "1",
      },
      message: "UserChannel Removed!",
      status: "success",
    });

    // error
    UserChannelService.removeUserChannel.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await UserChannelController.removeUserChannel(
      {
        body: {
          UserId: "1",
          ChannelId: "1",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
});
