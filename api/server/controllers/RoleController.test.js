import RoleController from "./RoleController";
import RoleService from "../services/RoleService";
import { res } from "../utils/Test";
jest.mock("../services/RoleService");

describe("RoleController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllRoles", async () => {
    // no Roles
    RoleService.getAllRoles.mockImplementationOnce(() => []);
    await RoleController.getAllRoles(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Role found",
      status: "success",
    });

    // Roles
    RoleService.getAllRoles.mockImplementationOnce(() => [
      { name: "foo" },
      { name: "bar" },
    ]);
    await RoleController.getAllRoles(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ name: "foo" }, { name: "bar" }],
      message: "Roles retrieved",
      status: "success",
    });

    // error
    RoleService.getAllRoles.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await RoleController.getAllRoles(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("addRole", async () => {
    // missing name in request
    await RoleController.addRole({ body: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // add Role
    RoleService.addRole.mockImplementationOnce(() => ({ name: "foo" }));
    await RoleController.addRole({ body: { role: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Role Added!",
      status: "success",
    });

    // error
    RoleService.addRole.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await RoleController.addRole({ body: { role: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedRole", async () => {
    // missing name in request
    await RoleController.updatedRole({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // Role not found
    RoleService.updateRole.mockImplementationOnce(() => null);
    await RoleController.updatedRole(
      {
        body: { name: "foo" },
        params: { id: 2 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Role with the id: 2",
      status: "error",
    });

    // update Role
    RoleService.updateRole.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await RoleController.updatedRole(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Role updated",
      status: "success",
    });

    // error
    RoleService.updateRole.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await RoleController.updatedRole(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getARole", async () => {
    // missing id in request
    await RoleController.getARole({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // Role not found
    RoleService.getARole.mockImplementationOnce(() => null);
    await RoleController.getARole(
      {
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Role with the id 3",
      status: "error",
    });

    // get Role
    RoleService.getARole.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await RoleController.getARole(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Found Role",
      status: "success",
    });

    // error
    RoleService.getARole.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await RoleController.getARole(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
  test("deleteRole", async () => {
    // missing id in request
    await RoleController.deleteRole({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // Role not found
    RoleService.deleteRole.mockImplementationOnce(() => null);
    await RoleController.deleteRole(
      {
        body: { name: "foo" },
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Role with the id 3 cannot be found",
      status: "error",
    });

    // delete Role
    RoleService.deleteRole.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await RoleController.deleteRole(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Role deleted",
      status: "success",
    });

    // error
    RoleService.deleteRole.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await RoleController.deleteRole(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
});
