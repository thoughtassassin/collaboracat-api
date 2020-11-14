import RequestChannelService from "./RequestChannelService";
import database from "../src/models";
jest.mock("../src/models");

describe("RequestChannelService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAdminUsers", async () => {
    await RequestChannelService.getAdminUsers();
    expect(database.Users.findAll).toHaveBeenCalledWith({
      where: { RoleId: 1 },
      attributes: ["username", "email"],
    });
    try {
      database.Users.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await RequestChannelService.getAdminUsers();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
