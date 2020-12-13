import CommentController from "./CommentController";
import ChannelService from "../services/ChannelService";
import MessageService from "../services/MessageService";
import CommentService from "../services/CommentService";
import sgMail from "@sendgrid/mail";
import UserService from "../services/UserService";
import { res } from "../utils/Test";
jest.mock("../services/CommentService");
jest.mock("../services/ChannelService");
jest.mock("../services/MessageService");
jest.mock("../services/UserService");
jest.mock("@sendgrid/mail");

describe("CommentController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("getAllComments", async () => {
    // no comments
    CommentService.getAllComments.mockImplementationOnce(() => []);
    await CommentController.getAllComments(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "No Comments found",
      status: "success",
    });

    // comments
    CommentService.getAllComments.mockImplementationOnce(() => [
      { content: "foo" },
    ]);
    await CommentController.getAllComments(null, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ content: "foo" }],
      message: "Comments retrieved",
      status: "success",
    });

    // error
    CommentService.getAllComments.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await CommentController.getAllComments(null, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("addComment", async () => {
    // no content
    await CommentController.addComment(
      {
        body: {
          MessageId: 5,
          UserId: 5,
          url: "https://url.api",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no MessageId
    await CommentController.addComment(
      {
        body: {
          content: "foo",
          UserId: 5,
          url: "https://url.api",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no UserId
    await CommentController.addComment(
      {
        body: {
          content: "foo",
          MessageId: 5,
          url: "https://url.api",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // no url
    await CommentController.addComment(
      {
        body: {
          content: "foo",
          MessageId: 5,
          UserId: 5,
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide complete details",
      status: "error",
    });

    // comment added
    CommentService.addComment.mockImplementationOnce(() => ({
      content: "foo",
      MessageId: 5,
      UserId: 5,
      url: "https://url.api",
    }));
    CommentService.getNotifiedUsers.mockImplementationOnce(() => [
      { recipient: "johndoe@mail.com" },
      { recipient: "janedoe@mail.com" },
    ]);
    UserService.getUserById.mockImplementationOnce(() => ({
      username: "John Doe",
    }));
    MessageService.getAMessage.mockImplementationOnce(() => ({
      ChannelId: 5,
    }));
    ChannelService.getAChannel.mockImplementationOnce(() => ({
      name: "bar",
    }));
    await CommentController.addComment(
      {
        body: {
          content: "foo",
          MessageId: 5,
          UserId: 5,
          url: "https://url.api",
        },
      },
      res
    );
    expect(sgMail.send).toHaveBeenCalledWith({
      to: ["johndoe@mail.com", "janedoe@mail.com"],
      from: "notifications@collaboracast.com",
      subject: "bar: J. Doe (new comment)",
      text: "https://url.api/messages/5 foo",
      html: "https://url.api/messages/5 foo",
    });
    expect(res.json).toHaveBeenCalledWith({
      data: {
        content: "foo",
        MessageId: 5,
        UserId: 5,
        url: "https://url.api",
      },
      message: "Comment Added!",
      status: "success",
    });

    // error
    CommentService.addComment.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await CommentController.addComment(
      {
        body: {
          content: "foo",
          MessageId: 5,
          UserId: 5,
          url: "https://url.api",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("updatedComment", async () => {
    // no id in request
    await CommentController.updatedComment(
      { body: { content: "foo" }, params: {} },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no Comment with requested id
    CommentService.updateComment.mockImplementationOnce(() => null);
    await CommentController.updatedComment(
      { body: { content: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Comment with the id: 5",
      status: "error",
    });

    // valid request
    CommentService.updateComment.mockImplementationOnce(() => ({
      content: "foo",
    }));
    await CommentController.updatedComment(
      { body: { content: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: { content: "foo" },
      message: "Comment updated",
      status: "success",
    });

    // error
    CommentService.updateComment.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await CommentController.updatedComment(
      { body: { content: "foo" }, params: { id: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("getAComment", async () => {
    // no id in request
    await CommentController.getAComment({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no Comment with requested id
    CommentService.getAComment.mockImplementationOnce(() => null);
    await CommentController.getAComment({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Comment with the id 5",
      status: "error",
    });

    // valid request
    CommentService.getAComment.mockImplementationOnce(() => ({
      content: "foo",
    }));
    await CommentController.getAComment({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      data: { content: "foo" },
      message: "Found Comment",
      status: "success",
    });

    // error
    CommentService.getAComment.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await CommentController.getAComment({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("deleteComment", async () => {
    // no id in request
    await CommentController.deleteComment({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a numeric value",
      status: "error",
    });

    // no Comment with requested id
    CommentService.deleteComment.mockImplementationOnce(() => null);
    await CommentController.deleteComment({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Comment with the id 5 cannot be found",
      status: "error",
    });

    // valid request
    CommentService.deleteComment.mockImplementationOnce(() => ({
      name: "foo",
    }));
    await CommentController.deleteComment({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Comment deleted",
      status: "success",
    });

    // error
    CommentService.deleteComment.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await CommentController.deleteComment({ params: { id: 5 } }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getMessageComments", async () => {
    // no messageid
    await CommentController.getMessageComments({ params: {} }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // no comments
    CommentService.getMessageComments.mockImplementationOnce(() => "");
    await CommentController.getMessageComments(
      { params: { messageid: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find Comments with the messageid 5",
      status: "error",
    });

    // comments
    CommentService.getMessageComments.mockImplementationOnce(() => [
      { content: "foo" },
      { content: "bar" },
    ]);
    await CommentController.getMessageComments(
      { params: { messageid: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: [{ content: "foo" }, { content: "bar" }],
      message: "Found Comments",
      status: "success",
    });

    // error
    CommentService.getMessageComments.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await CommentController.getMessageComments(
      { params: { messageid: 5 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
