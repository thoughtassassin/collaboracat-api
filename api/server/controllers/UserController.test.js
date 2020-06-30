import UserController from "./UserController";
import UserService from "../services/UserService";
import { res } from "../utils/Test";
jest.mock("../services/UserService");

describe("UserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllUsers", async () => {
    // users in database
    UserService.getAllUsers.mockImplementationOnce(() => [
      { email: "test@test.com" },
    ]);
    await UserController.getAllUsers("", res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ email: "test@test.com" }],
      message: "Users retrieved",
      status: "success",
    });

    // no users in database
    UserService.getAllUsers.mockImplementationOnce(() => []);
    await UserController.getAllUsers("", res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No User found",
      status: "success",
    });

    // error
    UserService.getAllUsers.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserController.getAllUsers("", res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("addUser", async () => {
    // no password in request
    await UserController.addUser({ body: { username: "John Doe" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no username in request
    await UserController.addUser({ body: { password: "1234" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // valid request
    UserService.addUser.mockImplementationOnce(() => ({
      username: "John Doe",
      password: "1234",
    }));
    await UserController.addUser(
      { body: { username: "John Doe", password: "1234" } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { password: "1234", username: "John Doe" },
      message: "User Added!",
      status: "success",
    });

    // error
    UserService.addUser.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserController.addUser(
      { body: { username: "John Doe", password: "1234" } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("updatedUser", async () => {
    // no id in request
    await UserController.updatedUser(
      { body: { username: "John Doe" }, params: {} },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no user with requested id
    UserService.updateUser.mockImplementationOnce(() => null);
    await UserController.updatedUser(
      { body: { username: "John Doe" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find User with the id: 5",
      status: "error",
    });

    // valid request
    UserService.updateUser.mockImplementationOnce(() => ({
      username: "John Doe",
    }));
    await UserController.updatedUser(
      { body: { username: "John Doe" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { username: "John Doe" },
      message: "User updated",
      status: "success",
    });

    // error
    UserService.updateUser.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserController.updatedUser(
      { body: { username: "John Doe" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("getAUser", async () => {
    // no id in request
    await UserController.getAUser({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid username",
      status: "error",
    });

    // no user with requested username
    UserService.getAUser.mockImplementationOnce(() => null);
    await UserController.getAUser({ params: { username: "John Doe" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find User John Doe",
      status: "error",
    });

    // valid request
    UserService.getAUser.mockImplementationOnce(() => ({
      username: "John Doe",
    }));
    await UserController.getAUser({ params: { username: "John Doe" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      data: { username: "John Doe" },
      message: "Found User",
      status: "success",
    });

    // error
    UserService.getAUser.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserController.getAUser({ params: { username: "John Doe" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("deleteUser", async () => {
    // no id in request
    await UserController.deleteUser(
      { body: { username: "John Doe" }, params: {} },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // no user with requested id
    UserService.deleteUser.mockImplementationOnce(() => null);
    await UserController.deleteUser({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "User with the id 5 cannot be found",
      status: "error",
    });

    // valid request
    UserService.deleteUser.mockImplementationOnce(() => ({
      username: "John Doe",
    }));
    await UserController.deleteUser({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "User deleted",
      status: "success",
    });

    // error
    UserService.deleteUser.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await UserController.deleteUser({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
