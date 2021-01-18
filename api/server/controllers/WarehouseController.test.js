import WarehouseController from "./WarehouseController";
import WarehouseService from "../services/WarehouseService";
import { res } from "../utils/Test";
jest.mock("../services/WarehouseService");

describe("WarehouseController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllWarehouses", async () => {
    // no Warehouses
    WarehouseService.getAllWarehouses.mockImplementationOnce(() => []);
    await WarehouseController.getAllWarehouses(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Warehouse found",
      status: "success",
    });

    // Warehouses
    WarehouseService.getAllWarehouses.mockImplementationOnce(() => [
      { Warehouse: "foo" },
      { Warehouse: "bar" },
    ]);
    await WarehouseController.getAllWarehouses(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ Warehouse: "foo" }, { Warehouse: "bar" }],
      message: "Warehouses retrieved",
      status: "success",
    });

    // error
    WarehouseService.getAllWarehouses.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await WarehouseController.getAllWarehouses(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("addWarehouse", async () => {
    // missing Warehouse in request
    await WarehouseController.addWarehouse({ body: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // add Warehouse
    WarehouseService.addWarehouse.mockImplementationOnce(() => ({
      Warehouse: "foo",
    }));
    await WarehouseController.addWarehouse({ body: { Warehouse: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      data: { Warehouse: "foo" },
      message: "Warehouse Added!",
      status: "success",
    });

    // error
    WarehouseService.addWarehouse.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await WarehouseController.addWarehouse({ body: { Warehouse: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedWarehouse", async () => {
    // missing name in request
    await WarehouseController.updatedWarehouse({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // Warehouse not found
    WarehouseService.updateWarehouse.mockImplementationOnce(() => null);
    await WarehouseController.updatedWarehouse(
      {
        body: { Warehouse: "foo" },
        params: { id: 2 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Warehouse with the id: 2",
      status: "error",
    });

    // update Warehouse
    WarehouseService.updateWarehouse.mockImplementationOnce(() => ({
      Warehouse: "foo",
    }));
    await WarehouseController.updatedWarehouse(
      {
        body: { Warehouse: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { Warehouse: "foo" },
      message: "Warehouse updated",
      status: "success",
    });

    // error
    WarehouseService.updateWarehouse.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await WarehouseController.updatedWarehouse(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getAWarehouse", async () => {
    // missing id in request
    await WarehouseController.getAWarehouse({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // Warehouse not found
    WarehouseService.getAWarehouse.mockImplementationOnce(() => null);
    await WarehouseController.getAWarehouse(
      {
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Warehouse with the id 3",
      status: "error",
    });

    // get Warehouse
    WarehouseService.getAWarehouse.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await WarehouseController.getAWarehouse(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Found Warehouse",
      status: "success",
    });

    // error
    WarehouseService.getAWarehouse.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await WarehouseController.getAWarehouse({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
  test("deleteWarehouse", async () => {
    // missing id in request
    await WarehouseController.deleteWarehouse({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // Warehouse not found
    WarehouseService.deleteWarehouse.mockImplementationOnce(() => null);
    await WarehouseController.deleteWarehouse(
      {
        body: { name: "foo" },
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Warehouse with the id 3 cannot be found",
      status: "error",
    });

    // delete Warehouse
    WarehouseService.deleteWarehouse.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await WarehouseController.deleteWarehouse(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Warehouse deleted",
      status: "success",
    });

    // error
    WarehouseService.deleteWarehouse.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await WarehouseController.deleteWarehouse(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
});
