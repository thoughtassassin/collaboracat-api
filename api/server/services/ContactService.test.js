import ContactService from "./ContactService";
import database from "../src/models";
jest.mock("../src/models");

describe("ContactService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllContacts", async () => {
    await ContactService.getAllContacts();
    expect(database.Contacts.findAll).toHaveBeenCalled();
    try {
      database.Contacts.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ContactService.getAllContacts();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addContact", async () => {
    await ContactService.addContact("foo");
    expect(database.Contacts.create).toHaveBeenCalledWith("foo");
    try {
      database.Contacts.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ContactService.addContact("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateContact", async () => {
    await ContactService.updateContact(1, "foo");
    expect(database.Contacts.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Contacts.update).not.toBeCalled();

    database.Contacts.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await ContactService.updateContact(1, "foo");
    expect(database.Contacts.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Contacts.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Contacts.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Contacts.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await ContactService.updateContact(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAContact", async () => {
    await ContactService.getAContact(1);
    expect(database.Contacts.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Contacts.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ContactService.getAContact(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteContact", async () => {
    await ContactService.deleteContact(1);
    expect(database.Contacts.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Contacts.destroy).not.toBeCalled();

    database.Contacts.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await ContactService.deleteContact(1);
    expect(database.Contacts.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Contacts.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Contacts.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Contacts.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await ContactService.deleteContact(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getChannelContacts", async () => {
    await ContactService.getChannelContacts(1);
    expect(database.Contacts.findAll).toHaveBeenCalledWith({
      where: { ChannelId: 1 },
    });
    try {
      database.Contacts.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ContactService.getChannelContacts(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
