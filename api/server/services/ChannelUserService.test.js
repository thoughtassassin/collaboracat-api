import ChannelUserService from "./ChannelUserService";
import database from "../src/models";
jest.mock("../src/models");

describe("Channel User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getChannelUsers", async () => {
    await ChannelUserService.getChannelUsers(1);
    expect(database.Channels.findOne).toHaveBeenCalledWith({
      where: { id: Number(1) },
      include: [
        {
          model: database.Users,
          as: "users",
          required: false,
          attributes: ["id", "username", "email", "phone"],
          where: { archived: null },
          through: {
            model: database.UserChannels,
            as: "UserChannels",
            attributes: ["UserId", "ChannelId"],
          },
        },
      ],
    });
    try {
      database.Channels.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ChannelUserService.getChannelUsers();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
