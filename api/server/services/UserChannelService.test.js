import UserChannelService from "./UserChannelService";
import database from "../src/models";
jest.mock("../src/models");

describe("UserChannelService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllUserChannels", async () => {
    await UserChannelService.getAllUserChannels();
    expect(database.UserChannel.findAll).toHaveBeenCalledWith();
    try {
      database.UserChannel.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserChannelService.getAllUserChannels();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addUserChannel", async () => {
    await UserChannelService.addUserChannel("foo");
    expect(database.UserChannel.create).toHaveBeenCalledWith("foo");
    try {
      database.UserChannel.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserChannelService.addUserChannel("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateUserChannel", async () => {
    await UserChannelService.updateUserChannel(1, "foo");
    expect(database.UserChannel.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.UserChannel.update).not.toBeCalled();

    database.UserChannel.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await UserChannelService.updateUserChannel(1, "foo");
    expect(database.UserChannel.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.UserChannel.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.UserChannel.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.UserChannel.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await UserChannelService.updateUserChannel(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAUserChannel", async () => {
    await UserChannelService.getAUserChannel(1);
    expect(database.UserChannel.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.UserChannel.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserChannelService.getAUserChannel(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteUserChannel", async () => {
    await UserChannelService.deleteUserChannel(1);
    expect(database.UserChannel.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.UserChannel.destroy).not.toBeCalled();

    database.UserChannel.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await UserChannelService.deleteUserChannel(1);
    expect(database.UserChannel.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.UserChannel.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.UserChannel.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.UserChannel.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await UserChannelService.deleteUserChannel(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("removeUserChannel", async () => {
    await UserChannelService.removeUserChannel(1, 2);
    expect(database.UserChannel.findOne).toHaveBeenCalledWith({
      where: { ChannelId: 1, UserId: 2 },
    });
    expect(database.UserChannel.destroy).not.toBeCalled();

    database.UserChannel.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await UserChannelService.removeUserChannel(1, 2);
    expect(database.UserChannel.findOne).toHaveBeenCalledWith({
      where: { ChannelId: 1, UserId: 2 },
    });
    expect(database.UserChannel.destroy).toHaveBeenCalledWith({
      where: { ChannelId: 1, UserId: 2 },
    });
    try {
      database.UserChannel.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.UserChannel.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await UserChannelService.removeUserChannel(1, 2);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
