import LoginController from "./LoginController";
import LoginService from "../services/LoginService";
import { res } from "../utils/Test";
jest.mock("../services/LoginService");

describe("LoginController", () => {
  test("login", async () => {
    // no password
    await LoginController.login({ body: { email: "foo@bar.com" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email and password are required",
      status: "error",
    });

    // no email
    await LoginController.login({ body: { password: "1234" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email and password are required",
      status: "error",
    });

    // user not found
    LoginService.login.mockImplementationOnce(() => null);
    await LoginController.login(
      {
        body: {
          email: "foo@bar.com",
          password: "1234",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found.",
      status: "error",
    });

    // password doesn't match
    LoginService.login.mockImplementationOnce(() => {
      const comparePassword = (password, callback) => {
        callback(false, password === "abcd");
      };
      return {
        comparePassword,
        dataValues: {
          id: "5",
          username: "John Doe",
          email: "jdoe@email.com",
          Role: {
            role: "admin",
          },
        },
      };
    });
    await LoginController.login(
      {
        body: {
          email: "foo@bar.com",
          password: "1234",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication failed. Wrong password.",
      status: "error",
    });

    // password matches
    LoginService.login.mockImplementationOnce(() => {
      const comparePassword = (password, callback) => {
        callback(false, password === "abcd");
      };
      return {
        comparePassword,
        dataValues: {
          id: "5",
          username: "John Doe",
          email: "jdoe@email.com",
          Role: {
            role: "admin",
          },
        },
      };
    });
    await LoginController.login(
      {
        body: {
          email: "foo@bar.com",
          password: "abcd",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: expect.any(String),
      message: "Authenticated",
      status: "success",
    });

    // error
    LoginService.login.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await LoginController.login(
      {
        body: {
          email: "foo@bar.com",
          password: "abcd",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
