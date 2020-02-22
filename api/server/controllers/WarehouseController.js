import WarehouseService from "../services/WarehouseService";
import Util from "../utils/Utils";

const util = new Util();

class WarehouseController {
  static async getAllWarehouses(req, res) {
    try {
      const allWarehouses = await WarehouseService.getAllWarehouses();
      if (allWarehouses.length > 0) {
        util.setSuccess(200, "Warehouses retrieved", allWarehouses);
      } else {
        util.setSuccess(200, "No Warehouse found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addWarehouse(req, res) {
    if (!req.body.Warehouse) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newWarehouse = req.body;
    try {
      const createdWarehouse = await WarehouseService.addWarehouse(
        newWarehouse
      );
      util.setSuccess(201, "Warehouse Added!", createdWarehouse);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedWarehouse(req, res) {
    const alteredWarehouse = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateWarehouse = await WarehouseService.updateWarehouse(
        id,
        alteredWarehouse
      );
      if (!updateWarehouse) {
        util.setError(404, `Cannot find Warehouse with the id: ${id}`);
      } else {
        util.setSuccess(200, "Warehouse updated", updateWarehouse);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAWarehouse(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theWarehouse = await WarehouseService.getAWarehouse(id);

      if (!theWarehouse) {
        util.setError(404, `Cannot find Warehouse with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Warehouse", theWarehouse);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteWarehouse(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const WarehouseToDelete = await WarehouseService.deleteWarehouse(id);

      if (WarehouseToDelete) {
        util.setSuccess(200, "Warehouse deleted");
      } else {
        util.setError(404, `Warehouse with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default WarehouseController;
