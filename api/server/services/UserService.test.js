import UserService from "./UserService";
import database from "../src/models";
jest.mock("../src/models");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllUsers", async () => {
    await UserService.getAllUsers();
    expect(database.Users.findAll).toHaveBeenCalledWith({
      where: { archived: null },
      order: [["username", "ASC"]],
    });
    try {
      database.Users.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserService.getAllUsers();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addUser", async () => {
    await UserService.addUser("foo");
    expect(database.Users.create).toHaveBeenCalledWith("foo");
    try {
      database.Users.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserService.addUser("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateUser", async () => {
    await UserService.updateUser(1, "foo");
    expect(database.Users.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Users.update).not.toBeCalled();

    database.Users.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await UserService.updateUser(1, "foo");
    expect(database.Users.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Users.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Users.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Users.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await UserService.updateUser(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAUser", async () => {
    await UserService.getAUser("johndoe@foo.com");
    expect(database.Users.findOne).toHaveBeenCalledWith({
      where: { email: "johndoe@foo.com" },
      include: [
        {
          model: database.Feeds,
          as: "feeds",
          required: false,
          attributes: ["id", "name"],
          through: {
            model: database.UserFeeds,
            as: "UserFeeds",
            attributes: ["UserId", "FeedId"],
          },
        },
        {
          model: database.Channels,
          as: "channels",
          required: false,
          attributes: ["id", "name", "FeedId"],
          through: {
            model: database.UserChannels,
            as: "UserChannels",
            attributes: ["UserId", "ChannelId"],
          },
        },
      ],
      order: [["channels", "name", "ASC"]],
    });
    try {
      database.Users.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserService.getAUser("johndoe@foo.com");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getUserById", async () => {
    await UserService.getUserById(1);
    expect(database.Users.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      include: [
        {
          model: database.Feeds,
          as: "feeds",
          required: false,
          attributes: ["id", "name"],
          through: {
            model: database.UserFeeds,
            as: "UserFeeds",
            attributes: ["UserId", "FeedId"],
          },
        },
        {
          model: database.Channels,
          as: "channels",
          required: false,
          attributes: ["id", "name", "FeedId"],
          through: {
            model: database.UserChannels,
            as: "UserChannels",
            attributes: ["UserId", "ChannelId"],
          },
        },
      ],
      order: [["channels", "name", "ASC"]],
    });
    try {
      database.Users.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await UserService.getUserById(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteUser", async () => {
    await UserService.deleteUser(1);
    expect(database.Users.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Users.destroy).not.toBeCalled();

    database.Users.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await UserService.deleteUser(1);
    expect(database.Users.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Users.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Users.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Users.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await UserService.deleteUser(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
