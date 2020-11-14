import LoginService from "./LoginService";
import database from "../src/models";
jest.mock("../src/models");

describe("LoginService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllLogins", async () => {
    await LoginService.login();
    expect(database.Users.findOne).toHaveBeenCalled();
    try {
      database.Users.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await LoginService.login();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
