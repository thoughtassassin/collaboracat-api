import ChannelService from "./ChannelService";
import database from "../src/models";
jest.mock("../src/models");

describe("ChannelService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllChannels", async () => {
    await ChannelService.getAllChannels();
    expect(database.Channels.findAll).toHaveBeenCalledWith({
      order: [["name", "ASC"]],
      where: { archived: null },
    });
    try {
      database.Channels.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ChannelService.getAllChannels();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addChannel", async () => {
    await ChannelService.addChannel("foo");
    expect(database.Channels.create).toHaveBeenCalledWith("foo");
    try {
      database.Channels.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ChannelService.addChannel("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateChannel", async () => {
    await ChannelService.updateChannel(1, "foo");
    expect(database.Channels.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Channels.update).not.toBeCalled();

    database.Channels.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await ChannelService.updateChannel(1, "foo");
    expect(database.Channels.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Channels.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Channels.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Channels.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await ChannelService.updateChannel(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAChannel", async () => {
    await ChannelService.getAChannel(1);
    expect(database.Channels.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Channels.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ChannelService.getAChannel(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteChannel", async () => {
    await ChannelService.deleteChannel(1);
    expect(database.Channels.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Channels.destroy).not.toBeCalled();

    database.Channels.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await ChannelService.deleteChannel(1);
    expect(database.Channels.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Channels.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Channels.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Channels.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await ChannelService.deleteChannel(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
