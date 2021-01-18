import WarehouseService from "./WarehouseService";
import database from "../src/models";
jest.mock("../src/models");

describe("WarehouseService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllWarehouses", async () => {
    await WarehouseService.getAllWarehouses();
    expect(database.Warehouse.findAll).toHaveBeenCalledWith();
    try {
      database.Warehouse.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await WarehouseService.getAllWarehouses();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addWarehouse", async () => {
    await WarehouseService.addWarehouse("foo");
    expect(database.Warehouse.create).toHaveBeenCalledWith("foo");
    try {
      database.Warehouse.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await WarehouseService.addWarehouse("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateWarehouse", async () => {
    await WarehouseService.updateWarehouse(1, "foo");
    expect(database.Warehouse.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Warehouse.update).not.toBeCalled();

    database.Warehouse.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await WarehouseService.updateWarehouse(1, "foo");
    expect(database.Warehouse.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Warehouse.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Warehouse.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Warehouse.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await WarehouseService.updateWarehouse(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAWarehouse", async () => {
    await WarehouseService.getAWarehouse(1);
    expect(database.Warehouse.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Warehouse.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await WarehouseService.getAWarehouse(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteWarehouse", async () => {
    await WarehouseService.deleteWarehouse(1);
    expect(database.Warehouse.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Warehouse.destroy).not.toBeCalled();

    database.Warehouse.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await WarehouseService.deleteWarehouse(1);
    expect(database.Warehouse.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Warehouse.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Warehouse.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Warehouse.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await WarehouseService.deleteWarehouse(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
