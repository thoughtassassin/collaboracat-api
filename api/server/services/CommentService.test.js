import CommentService from "./CommentService";
import database from "../src/models";
jest.mock("../src/models");

describe("CommentService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllComments", async () => {
    await CommentService.getAllComments();
    expect(database.Comments.findAll).toHaveBeenCalled();
    try {
      database.Comments.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await CommentService.getAllComments();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addComment", async () => {
    await CommentService.addComment("foo");
    expect(database.Comments.create).toHaveBeenCalledWith("foo");
    try {
      database.Comments.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await CommentService.addComment("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateComment", async () => {
    await CommentService.updateComment(1, "foo");
    expect(database.Comments.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Comments.update).not.toBeCalled();

    database.Comments.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await CommentService.updateComment(1, "foo");
    expect(database.Comments.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Comments.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Comments.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Comments.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await CommentService.updateComment(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAComment", async () => {
    await CommentService.getAComment(1);
    expect(database.Comments.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Comments.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await CommentService.getAComment(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteComment", async () => {
    await CommentService.deleteComment(1);
    expect(database.Comments.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Comments.destroy).not.toBeCalled();

    database.Comments.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await CommentService.deleteComment(1);
    expect(database.Comments.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Comments.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Comments.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Comments.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await CommentService.deleteComment(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getMessageComments", async () => {
    await CommentService.getMessageComments(1);
    expect(database.Comments.findAll).toHaveBeenCalledWith({
      where: { MessageId: 1 },
    });
    try {
      database.Comments.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await CommentService.getMessageComments(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getNotifiedUsers", async () => {
    database.sequelize.query.mockImplementationOnce(() => [
      {
        phone: "432555555",
        domain: "carrier.com",
      },
      {
        phone: "432555556",
        domain: "phone.com",
      },
    ]);
    const notifiedUsers = await CommentService.getNotifiedUsers(1);
    expect(database.sequelize.query).toHaveBeenCalledWith(
      `SELECT "Messages"."UserId", "Users"."phone", "Providers"."domain"
                    FROM "Messages"
                    JOIN "Users" ON "Messages"."UserId" = "Users"."id"
                    JOIN "Providers" ON "Providers"."id" = "Users"."ProviderId"
                    WHERE "Messages"."id" = :messageId
                    UNION
                    SELECT "Comments"."UserId", "Users"."phone", "Providers"."domain"
                    FROM "Messages"
                    JOIN "Comments" ON "Comments"."MessageId" = "Messages"."id"
                    JOIN "Users" ON "Comments"."UserId" = "Users"."id"
                    JOIN "Providers" ON "Providers"."id" = "Users"."ProviderId"
                    WHERE "Messages"."id" = :messageId`,
      {
        replacements: { messageId: 1 },
        type: database.sequelize.QueryTypes.SELECT,
      }
    );
    expect(notifiedUsers).toEqual([
      { recipient: "432555555@carrier.com" },
      { recipient: "432555556@phone.com" },
    ]);

    try {
      database.sequelize.query.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await CommentService.getNotifiedUsers(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
