import ProviderController from "./ProviderController";
import ProviderService from "../services/ProviderService";
import { res } from "../utils/Test";
jest.mock("../services/ProviderService");

describe("ProviderController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllProviders", async () => {
    // no Providers
    ProviderService.getAllProviders.mockImplementationOnce(() => []);
    await ProviderController.getAllProviders(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Provider found",
      status: "success",
    });

    // Providers
    ProviderService.getAllProviders.mockImplementationOnce(() => [
      { name: "foo" },
      { name: "bar" },
    ]);
    await ProviderController.getAllProviders(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ name: "foo" }, { name: "bar" }],
      message: "Providers retrieved",
      status: "success",
    });

    // error
    ProviderService.getAllProviders.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ProviderController.getAllProviders(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("addProvider", async () => {
    // missing name in request
    await ProviderController.addProvider({ body: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // add Provider
    ProviderService.addProvider.mockImplementationOnce(() => ({ name: "foo" }));
    await ProviderController.addProvider({ body: { Provider: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Provider Added!",
      status: "success",
    });

    // error
    ProviderService.addProvider.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ProviderController.addProvider({ body: { Provider: "foo" } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedProvider", async () => {
    // missing name in request
    await ProviderController.updatedProvider({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // Provider not found
    ProviderService.updateProvider.mockImplementationOnce(() => null);
    await ProviderController.updatedProvider(
      {
        body: { name: "foo" },
        params: { id: 2 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Provider with the id: 2",
      status: "error",
    });

    // update Provider
    ProviderService.updateProvider.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await ProviderController.updatedProvider(
      {
        body: { name: "foo" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Provider updated",
      status: "success",
    });

    // error
    ProviderService.updateProvider.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ProviderController.updatedProvider(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getAProvider", async () => {
    // missing id in request
    await ProviderController.getAProvider({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // Provider not found
    ProviderService.getAProvider.mockImplementationOnce(() => null);
    await ProviderController.getAProvider(
      {
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Provider with the id 3",
      status: "error",
    });

    // get Provider
    ProviderService.getAProvider.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await ProviderController.getAProvider(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { name: "foo" },
      message: "Found Provider",
      status: "success",
    });

    // error
    ProviderService.getAProvider.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await ProviderController.getAProvider(
      { body: { name: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
  test("deleteProvider", async () => {
    // missing id in request
    await ProviderController.deleteProvider({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // Provider not found
    ProviderService.deleteProvider.mockImplementationOnce(() => null);
    await ProviderController.deleteProvider(
      {
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Provider with the id 3 cannot be found",
      status: "error",
    });

    // delete Provider
    ProviderService.deleteProvider.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await ProviderController.deleteProvider(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Provider deleted",
      status: "success",
    });

    // error
    ProviderService.deleteProvider.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await ProviderController.deleteProvider({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
});
