import database from "../src/models";

class WarehouseService {
  static async getAllWarehouses() {
    try {
      return await database.Warehouse.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addWarehouse(newWarehouse) {
    try {
      return await database.Warehouse.create(newWarehouse);
    } catch (error) {
      throw error;
    }
  }

  static async updateWarehouse(id, updateWarehouse) {
    try {
      const WarehouseToUpdate = await database.Warehouse.findOne({
        where: { id: Number(id) }
      });

      if (WarehouseToUpdate) {
        await database.Warehouse.update(updateWarehouse, {
          where: { id: Number(id) }
        });

        return updateWarehouse;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAWarehouse(id) {
    try {
      const theWarehouse = await database.Warehouse.findOne({
        where: { id: Number(id) }
      });

      return theWarehouse;
    } catch (error) {
      throw error;
    }
  }

  static async deleteWarehouse(id) {
    try {
      const WarehouseToDelete = await database.Warehouse.findOne({
        where: { id: Number(id) }
      });

      if (WarehouseToDelete) {
        const deletedWarehouse = await database.Warehouse.destroy({
          where: { id: Number(id) }
        });
        return deletedWarehouse;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default WarehouseService;
