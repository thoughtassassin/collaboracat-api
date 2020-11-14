import ProviderService from "./ProviderService";
import database from "../src/models";
jest.mock("../src/models");

describe("ProviderService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllProviders", async () => {
    await ProviderService.getAllProviders();
    expect(database.Provider.findAll).toHaveBeenCalledWith();
    try {
      database.Provider.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ProviderService.getAllProviders();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addProvider", async () => {
    await ProviderService.addProvider("foo");
    expect(database.Provider.create).toHaveBeenCalledWith("foo");
    try {
      database.Provider.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ProviderService.addProvider("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateProvider", async () => {
    await ProviderService.updateProvider(1, "foo");
    expect(database.Provider.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Provider.update).not.toBeCalled();

    database.Provider.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await ProviderService.updateProvider(1, "foo");
    expect(database.Provider.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Provider.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Provider.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Provider.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await ProviderService.updateProvider(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAProvider", async () => {
    await ProviderService.getAProvider(1);
    expect(database.Provider.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Provider.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ProviderService.getAProvider(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteProvider", async () => {
    await ProviderService.deleteProvider(1);
    expect(database.Provider.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Provider.destroy).not.toBeCalled();

    database.Provider.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await ProviderService.deleteProvider(1);
    expect(database.Provider.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Provider.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Provider.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Provider.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await ProviderService.deleteProvider(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
