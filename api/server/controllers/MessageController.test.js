import ChannelService from "../services/ChannelService";
import MessageController from "./MessageController";
import MessageService from "../services/MessageService";
import UserService from "../services/UserService";
import { res } from "../utils/Test";
import sgMail from "@sendgrid/mail";
jest.mock("../services/ChannelService");
jest.mock("../services/MessageService");
jest.mock("../services/UserService");
jest.mock("@sendgrid/mail");

describe("MessageController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllMessages", async () => {
    // page and limit param
    MessageService.getAllMessages.mockImplementationOnce(() => []);
    await MessageController.getAllMessages(
      { query: { page: 2, limit: 15 } },
      res
    );
    expect(MessageService.getAllMessages).toHaveBeenCalledWith(2, 15);

    // no messages
    MessageService.getAllMessages.mockImplementationOnce(() => []);
    await MessageController.getAllMessages({ query: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Messages found",
      status: "success",
    });

    // messages
    MessageService.getAllMessages.mockImplementationOnce(() => [
      { content: "foo" },
      { content: "bar" },
    ]);
    await MessageController.getAllMessages({ query: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ content: "foo" }, { content: "bar" }],
      message: "Messages retrieved",
      status: "success",
    });

    //error
    MessageService.getAllMessages.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await MessageController.getAllMessages({ query: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("addMessage", async () => {
    // no content
    await MessageController.addMessage(
      {
        body: {
          ChannelId: 1,
          UserId: 1,
          url: "https://api.url",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no ChannelId
    await MessageController.addMessage(
      {
        body: {
          content: "foo",
          UserId: 1,
          url: "https://api.url",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no UserId
    await MessageController.addMessage(
      {
        body: {
          content: "foo",
          ChannelId: 1,
          url: "https://api.url",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no url
    await MessageController.addMessage(
      {
        body: {
          content: "foo",
          ChannelId: 1,
          UserId: 1,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // add message
    MessageService.addMessage.mockImplementationOnce(() => ({
      content: "foo",
      ChannelId: 1,
      UserId: 1,
      url: "https://api.url",
    }));
    MessageService.getNotifiedUsers.mockImplementationOnce(() => [
      { recipient: "johndoe@gmail.com" },
      { recipient: "janedoe@gmail.com" },
    ]);
    UserService.getUserById.mockImplementationOnce(() => ({
      username: "Tom Jones",
    }));
    ChannelService.getAChannel.mockImplementationOnce(() => ({
      name: "baz",
    }));
    await MessageController.addMessage(
      {
        body: {
          content: "foo",
          ChannelId: 1,
          UserId: 1,
          url: "https://api.url",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: {
        content: "foo",
        ChannelId: 1,
        UserId: 1,
        url: "https://api.url",
      },
      message: "Message Added!",
      status: "success",
    });

    //error
    MessageService.addMessage.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await MessageController.addMessage(
      {
        body: {
          content: "foo",
          ChannelId: 1,
          UserId: 1,
          url: "https://api.url",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("updatedMessage", async () => {
    // no id
    await MessageController.updatedMessage({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // cannot find message
    MessageService.updateMessage.mockImplementationOnce(() => null);
    await MessageController.updatedMessage(
      {
        body: { content: "foo" },
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Message with the id: 1",
      status: "error",
    });

    // updates message
    MessageService.updateMessage.mockImplementationOnce(() => ({
      content: "foo",
    }));
    await MessageController.updatedMessage(
      {
        body: { content: "foo" },
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { content: "foo" },
      message: "Message updated",
      status: "success",
    });

    // error
    MessageService.updateMessage.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await MessageController.updatedMessage(
      {
        body: { content: "foo" },
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getAMessage", async () => {
    // no id
    await MessageController.getAMessage({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // cannot find message
    MessageService.getAMessage.mockImplementationOnce(() => null);
    await MessageController.getAMessage(
      {
        body: { content: "foo" },
        params: { id: 2 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Message with the id 2",
      status: "error",
    });

    // updates message
    MessageService.getAMessage.mockImplementationOnce(() => ({
      content: "bar",
    }));
    await MessageController.getAMessage(
      {
        body: { content: "bar" },
        params: { id: 2 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { content: "bar" },
      message: "Found Message",
      status: "success",
    });

    // error
    MessageService.getAMessage.mockImplementationOnce(() => {
      throw new Error("baz");
    });
    await MessageController.getAMessage(
      {
        body: { content: "foo" },
        params: { id: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "baz",
      status: "error",
    });
  });
  test("deleteMessage", async () => {
    // no id
    await MessageController.deleteMessage({ body: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // cannot find message
    MessageService.deleteMessage.mockImplementationOnce(() => null);
    await MessageController.deleteMessage(
      {
        body: { content: "foo" },
        params: { id: 3 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Message with the id 3 cannot be found",
      status: "error",
    });

    // delet message
    MessageService.deleteMessage.mockImplementationOnce(() => ({
      content: "bar",
    }));
    await MessageController.deleteMessage(
      {
        params: { id: 4 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Message deleted",
      status: "success",
    });

    // error
    MessageService.deleteMessage.mockImplementationOnce(() => {
      throw new Error("qux");
    });
    await MessageController.deleteMessage(
      {
        params: { id: 4 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "qux",
      status: "error",
    });
  });
  test("getChannelMessages", async () => {
    // without channelid
    await MessageController.getChannelMessages({ query: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // page and limit param
    await MessageController.getChannelMessages(
      { query: { page: 2, limit: 15 }, params: { channelid: 1 } },
      res
    );
    expect(MessageService.getChannelMessages).toHaveBeenCalledWith(1, 2, 15);

    // no messages
    MessageController.getChannelMessages(
      { query: { page: 2, limit: 15 }, params: { channelid: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Messages with the channelid 1",
      status: "error",
    });

    // messages
    MessageService.getChannelMessages.mockImplementationOnce(() => [
      { content: "foo" },
      { content: "bar" },
    ]);
    await MessageController.getChannelMessages(
      { query: { page: 2, limit: 15 }, params: { channelid: 1 } },
      res
    );

    expect(res.json).toHaveBeenCalledWith({
      data: [{ content: "foo" }, { content: "bar" }],
      message: "Found Messages",
      status: "success",
    });

    //error
    MessageService.getChannelMessages.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await MessageController.getChannelMessages(
      { query: { page: 2, limit: 15 }, params: { channelid: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getMessagesByUser", async () => {
    // without userid
    await MessageController.getMessagesByUser({ query: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid user id",
      status: "error",
    });

    // page and limit param
    await MessageController.getMessagesByUser(
      { query: { page: 2, limit: 15 }, params: { userId: 1 } },
      res
    );
    expect(MessageService.getMessagesByUser).toHaveBeenCalledWith(1, 2, 15);

    // no messages
    MessageController.getMessagesByUser(
      { query: { page: 2, limit: 15 }, params: { userId: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Messages with the user id 1",
      status: "error",
    });

    // messages
    MessageService.getMessagesByUser.mockImplementationOnce(() => [
      { content: "foo" },
      { content: "bar" },
    ]);
    await MessageController.getMessagesByUser(
      { query: { page: 2, limit: 15 }, params: { userId: 1 } },
      res
    );

    expect(res.json).toHaveBeenCalledWith({
      data: [{ content: "foo" }, { content: "bar" }],
      message: "Found Messages",
      status: "success",
    });

    //error
    MessageService.getMessagesByUser.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await MessageController.getMessagesByUser(
      { query: { page: 2, limit: 15 }, params: { userId: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getUserMessages", async () => {
    // without userid
    await MessageController.getUserMessages({ query: {}, params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid email",
      status: "error",
    });

    // page and limit param
    await MessageController.getUserMessages(
      { query: { page: 2, limit: 15 }, params: { email: "foo@email.com" } },
      res
    );
    expect(MessageService.getUserMessages).toHaveBeenCalledWith(
      "foo@email.com",
      2,
      15
    );

    // no messages
    MessageController.getUserMessages(
      { query: { page: 2, limit: 15 }, params: { email: "foo@email.com" } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Messages with the username foo@email.com",
      status: "error",
    });

    // messages
    MessageService.getUserMessages.mockImplementationOnce(() => [
      { content: "foo" },
      { content: "bar" },
    ]);
    await MessageController.getUserMessages(
      { query: { page: 2, limit: 15 }, params: { email: "foo@email.com" } },
      res
    );

    expect(res.json).toHaveBeenCalledWith({
      data: [{ content: "foo" }, { content: "bar" }],
      message: "Found Messages",
      status: "success",
    });

    //error
    MessageService.getUserMessages.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await MessageController.getUserMessages(
      { query: { page: 2, limit: 15 }, params: { email: "foo@email.com" } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
