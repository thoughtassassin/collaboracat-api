import ChannelController from "./ChannelController";
import ChannelService from "../services/ChannelService";
import { res } from "../utils/Test";
jest.mock("../services/ChannelService");

describe("ChannelController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllChannels", async () => {
    // Channels in database
    ChannelService.getAllChannels.mockImplementationOnce(() => [
      { name: "foo" },
    ]);
    await ChannelController.getAllChannels("", res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ name: "foo" }],
      message: "Channels retrieved",
      status: "success",
    });

    // no Channels in database
    ChannelService.getAllChannels.mockImplementationOnce(() => []);
    await ChannelController.getAllChannels("", res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Channel found",
      status: "success",
    });

    // error
    ChannelService.getAllChannels.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ChannelController.getAllChannels("", res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("addChannel", async () => {
    // no name in request
    await ChannelController.addChannel({ body: { FeedId: 1 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no FeedId in request
    await ChannelController.addChannel({ body: { name: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // valid request
    ChannelService.addChannel.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await ChannelController.addChannel(
      {
        body: {
          name: "foo",
          FeedId: 1,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Channel Added!",
      status: "success",
    });

    // error
    ChannelService.addChannel.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ChannelController.addChannel(
      {
        body: {
          name: "foo",
          FeedId: 1,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("updatedChannel", async () => {
    // no id in request
    await ChannelController.updatedChannel(
      { body: { name: "foo" }, params: {} },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no Channel with requested id
    ChannelService.updateChannel.mockImplementationOnce(() => null);
    await ChannelController.updatedChannel(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Channel with the id: 5",
      status: "error",
    });

    // valid request
    ChannelService.updateChannel.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await ChannelController.updatedChannel(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Channel updated",
      status: "success",
    });

    // error
    ChannelService.updateChannel.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ChannelController.updatedChannel(
      { body: { Channelname: "John Doe" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("getAChannel", async () => {
    // no id in request
    await ChannelController.getAChannel({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no Channel with requested id
    ChannelService.getAChannel.mockImplementationOnce(() => null);
    await ChannelController.getAChannel({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Channel with the id 5",
      status: "error",
    });

    // valid request
    ChannelService.getAChannel.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await ChannelController.getAChannel({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Found Channel",
      status: "success",
    });

    // error
    ChannelService.getAChannel.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ChannelController.getAChannel({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("deleteChannel", async () => {
    // no id in request
    await ChannelController.deleteChannel({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // no Channel with requested id
    ChannelService.deleteChannel.mockImplementationOnce(() => null);
    await ChannelController.deleteChannel({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Channel with the id 5 cannot be found",
      status: "error",
    });

    // valid request
    ChannelService.deleteChannel.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await ChannelController.deleteChannel({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Channel deleted",
      status: "success",
    });

    // error
    ChannelService.deleteChannel.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ChannelController.deleteChannel({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
