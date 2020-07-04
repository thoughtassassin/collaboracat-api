import ProviderService from "../services/ProviderService";
import Util from "../utils/Utils";

const util = new Util();

class ProviderController {
  static async getAllProviders(req, res) {
    try {
      const allProviders = await ProviderService.getAllProviders();
      if (allProviders.length > 0) {
        util.setSuccess(200, "Providers retrieved", allProviders);
      } else {
        util.setSuccess(200, "No Provider found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async addProvider(req, res) {
    if (!req.body.Provider) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newProvider = req.body;
    try {
      const createdProvider = await ProviderService.addProvider(newProvider);
      util.setSuccess(201, "Provider Added!", createdProvider);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedProvider(req, res) {
    const alteredProvider = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateProvider = await ProviderService.updateProvider(
        id,
        alteredProvider
      );
      if (!updateProvider) {
        util.setError(404, `Cannot find Provider with the id: ${id}`);
      } else {
        util.setSuccess(200, "Provider updated", updateProvider);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async getAProvider(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theProvider = await ProviderService.getAProvider(id);

      if (!theProvider) {
        util.setError(404, `Cannot find Provider with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Provider", theProvider);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteProvider(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const ProviderToDelete = await ProviderService.deleteProvider(id);

      if (ProviderToDelete) {
        util.setSuccess(200, "Provider deleted");
      } else {
        util.setError(404, `Provider with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default ProviderController;
