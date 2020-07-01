import ContactController from "./ContactController";
import ContactService from "../services/ContactService";
import { res } from "../utils/Test";
jest.mock("../services/ContactService");

describe("ContactController", () => {
  afterEach(() => jest.clearAllMocks());
  test("allContacts", async () => {
    ContactService.getAllContacts.mockImplementationOnce(() => []);
    await ContactController.getAllContacts(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Contact found",
      status: "success",
    });

    ContactService.getAllContacts.mockImplementationOnce(() => [
      { firstname: "John" },
      { firstname: "Jane" },
    ]);
    await ContactController.getAllContacts(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ firstname: "John" }, { firstname: "Jane" }],
      message: "Contacts retrieved",
      status: "success",
    });

    ContactService.getAllContacts.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ContactController.getAllContacts(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("addContact", async () => {
    // no firstname
    await ContactController.addContact(
      {
        body: {
          lastName: "Doe",
          phone: "4325555555",
          email: "foo@bar.com",
          ChannelId: "1",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no lastname
    await ContactController.addContact(
      {
        body: {
          firstName: "John",
          phone: "4325555555",
          email: "foo@bar.com",
          ChannelId: "1",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no phone or email
    await ContactController.addContact(
      {
        body: {
          firstName: "John",
          lastName: "Doe",
          ChannelId: "1",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no ChannelId
    await ContactController.addContact(
      {
        body: {
          firstName: "John",
          lastName: "Doe",
          phone: "4325555555",
          email: "foo@bar.com",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    ContactService.addContact.mockImplementationOnce(() => ({
      firstName: "John",
      lastName: "Doe",
      phone: "4325555555",
      email: "foo@bar.com",
      ChannelId: "1",
    }));
    await ContactController.addContact(
      {
        body: {
          firstName: "John",
          lastName: "Doe",
          phone: "4325555555",
          email: "foo@bar.com",
          ChannelId: "1",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: {
        firstName: "John",
        lastName: "Doe",
        phone: "4325555555",
        email: "foo@bar.com",
        ChannelId: "1",
      },
      message: "Contact Added!",
      status: "success",
    });

    ContactService.getAllContacts.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ContactController.getAllContacts(
      {
        firstName: "John",
        lastName: "Doe",
        phone: "4325555555",
        email: "foo@bar.com",
        ChannelId: "1",
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedContact", async () => {
    // no id
    await ContactController.updatedContact({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no contact found
    ContactService.updateContact.mockImplementationOnce(() => null);
    await ContactController.updatedContact(
      {
        body: { firstname: "Jim" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Contact with the id: 5",
      status: "error",
    });

    // contact found
    ContactService.updateContact.mockImplementationOnce(() => ({
      firstname: "Jim",
    }));
    await ContactController.updatedContact(
      {
        body: { firstname: "Jim" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { firstname: "Jim" },
      message: "Contact updated",
      status: "success",
    });

    ContactService.updateContact.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ContactController.updatedContact(
      {
        body: { firstname: "Jim" },
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getAContact", async () => {
    // no id
    await ContactController.getAContact({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no contact found
    ContactService.getAContact.mockImplementationOnce(() => null);
    await ContactController.getAContact(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Contact with the id 5",
      status: "error",
    });

    // contact found
    ContactService.getAContact.mockImplementationOnce(() => ({
      firstname: "John",
    }));
    await ContactController.getAContact(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { firstname: "John" },
      message: "Found Contact",
      status: "success",
    });

    // error
    ContactService.getAContact.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ContactController.getAContact(
      {
        params: { id: 5 },
      },
      res
    );

    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("deleteContact", async () => {
    // no id
    await ContactController.deleteContact({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // no contact found
    ContactService.deleteContact.mockImplementationOnce(() => null);
    await ContactController.deleteContact(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Contact with the id 5 cannot be found",
      status: "error",
    });

    // contact found
    ContactService.deleteContact.mockImplementationOnce(() => ({
      firstname: "John",
    }));
    await ContactController.deleteContact(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Contact deleted",
      status: "success",
    });

    // error
    ContactService.deleteContact.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ContactController.deleteContact(
      {
        params: { id: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getChannelContacts", async () => {
    // no id
    await ContactController.getChannelContacts({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no contact found
    ContactService.getChannelContacts.mockImplementationOnce(() => null);
    await ContactController.getChannelContacts(
      {
        params: { channelid: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find contacts with the channelid 5",
      status: "error",
    });

    // contact found
    ContactService.getChannelContacts.mockImplementationOnce(() => [
      {
        firstname: "John",
      },
      {
        firstname: "Jane",
      },
    ]);
    await ContactController.getChannelContacts(
      {
        params: { channelid: 5 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: [
        {
          firstname: "John",
        },
        {
          firstname: "Jane",
        },
      ],
      message: "Found Contacts",
      status: "success",
    });

    // error
    ContactService.getChannelContacts.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ContactController.getChannelContacts(
      {
        params: { channelid: 5 },
      },
      res
    );

    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
