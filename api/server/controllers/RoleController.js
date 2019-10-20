import RoleService from "../services/RoleService";
import Util from "../utils/Utils";

const util = new Util();

class RoleController {
  static async getAllRoles(req, res) {
    try {
      const allRoles = await RoleService.getAllRoles();
      if (allRoles.length > 0) {
        util.setSuccess(200, "Roles retrieved", allRoles);
      } else {
        util.setSuccess(200, "No Role found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addRole(req, res) {
    if (!req.body.role) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newRole = req.body;
    try {
      const createdRole = await RoleService.addRole(newRole);
      util.setSuccess(201, "Role Added!", createdRole);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedRole(req, res) {
    const alteredRole = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateRole = await RoleService.updateRole(id, alteredRole);
      if (!updateRole) {
        util.setError(404, `Cannot find Role with the id: ${id}`);
      } else {
        util.setSuccess(200, "Role updated", updateRole);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getARole(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theRole = await RoleService.getARole(id);

      if (!theRole) {
        util.setError(404, `Cannot find Role with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Role", theRole);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteRole(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const RoleToDelete = await RoleService.deleteRole(id);

      if (RoleToDelete) {
        util.setSuccess(200, "Role deleted");
      } else {
        util.setError(404, `Role with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default RoleController;
