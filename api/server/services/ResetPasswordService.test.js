import ResetPasswordService from "./ResetPasswordService";
import database from "../src/models";
jest.mock("../src/models");

describe("ResetPasswordService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getUser", async () => {
    await ResetPasswordService.getUser("johndoe@foo.com");
    expect(database.Users.findOne).toHaveBeenCalledWith({
      where: { email: "johndoe@foo.com" },
    });
    try {
      database.Users.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ResetPasswordService.getUser();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateUser", async () => {
    database.Users.findOne.mockImplementationOnce(() => ({}));
    await ResetPasswordService.updateUser(1, {
      email: "johnfdoe@foo.com",
    });
    expect(database.Users.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(database.Users.update).toHaveBeenCalledWith(
      { email: "johnfdoe@foo.com" },
      { where: { id: 1 } }
    );
    database.Users.findOne.mockImplementationOnce(() => null);
    await ResetPasswordService.updateUser(1, {
      email: "johnfdoe@foo.com",
    });
    expect(database.Users.update).toHaveBeenCalledTimes(1);
    try {
      database.Users.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ResetPasswordService.updateUser(1, { email: "johnfdoe@foo.com" });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
