import RoleService from "./RoleService";
import database from "../src/models";
jest.mock("../src/models");

describe("RoleService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllRoles", async () => {
    await RoleService.getAllRoles();
    expect(database.Role.findAll).toHaveBeenCalledWith();
    try {
      database.Role.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await RoleService.getAllRoles();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addRole", async () => {
    await RoleService.addRole("foo");
    expect(database.Role.create).toHaveBeenCalledWith("foo");
    try {
      database.Role.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await RoleService.addRole("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateRole", async () => {
    await RoleService.updateRole(1, "foo");
    expect(database.Role.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Role.update).not.toBeCalled();

    database.Role.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await RoleService.updateRole(1, "foo");
    expect(database.Role.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Role.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Role.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Role.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await RoleService.updateRole(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getARole", async () => {
    await RoleService.getARole(1);
    expect(database.Role.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Role.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await RoleService.getARole(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteRole", async () => {
    await RoleService.deleteRole(1);
    expect(database.Role.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Role.destroy).not.toBeCalled();

    database.Role.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await RoleService.deleteRole(1);
    expect(database.Role.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Role.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Role.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Role.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await RoleService.deleteRole(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
