import MessageService from "./MessageService";
import database from "../src/models";
jest.mock("../src/models");

describe("MessageService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getAllMessages", async () => {
    await MessageService.getAllMessages();
    expect(database.Messages.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: database.Users,
          attributes: ["username"],
          include: [
            {
              model: database.Warehouse,
              attributes: ["name"],
            },
          ],
        },
        {
          model: database.Comments,
          attributes: ["id"],
        },
        {
          model: database.Channels,
          attributes: ["name"],
          where: { archived: null },
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
      offset: 0,
    });
    try {
      database.Messages.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await MessageService.getAllMessages();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("addMessage", async () => {
    await MessageService.addMessage("foo");
    expect(database.Messages.create).toHaveBeenCalledWith("foo");
    try {
      database.Messages.create.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await MessageService.addMessage("foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("updateMessage", async () => {
    await MessageService.updateMessage(1, "foo");
    expect(database.Messages.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Messages.update).not.toBeCalled();

    database.Messages.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await MessageService.updateMessage(1, "foo");
    expect(database.Messages.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Messages.update).toHaveBeenCalledWith("foo", {
      where: { id: 1 },
    });
    try {
      database.Messages.update.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Messages.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await MessageService.updateMessage(1, "foo");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getAMessage", async () => {
    await MessageService.getAMessage(1);
    expect(database.Messages.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      include: [
        {
          model: database.Channels,
          attributes: ["name"],
        },
        {
          model: database.Comments,
          include: [
            {
              model: database.Users,
              attributes: ["username"],
              include: [
                {
                  model: database.Warehouse,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
        {
          model: database.Users,
          attributes: ["username"],
          include: [
            {
              model: database.Warehouse,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    try {
      database.Messages.findOne.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await MessageService.getAMessage(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("deleteMessage", async () => {
    await MessageService.deleteMessage(1);
    expect(database.Messages.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Messages.destroy).not.toBeCalled();

    database.Messages.findOne.mockImplementationOnce(() => ({
      id: 1,
      name: "bar",
    }));
    await MessageService.deleteMessage(1);
    expect(database.Messages.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(database.Messages.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    try {
      database.Messages.destroy.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      database.Messages.findOne.mockImplementationOnce(() => ({
        id: 1,
        name: "bar",
      }));
      await MessageService.deleteMessage(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getMessagesByUser", async () => {
    await MessageService.getMessagesByUser(1);
    expect(database.Messages.findAll).toHaveBeenCalledWith({
      where: { UserId: 1 },
      include: [
        {
          model: database.Users,
          attributes: ["username"],
          include: [
            {
              model: database.Warehouse,
              attributes: ["name"],
            },
          ],
        },
        {
          model: database.Comments,
          attributes: ["id"],
        },
        {
          model: database.Channels,
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
      offset: 0,
    });
    try {
      database.Messages.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await MessageService.getMessagesByUser(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getMessagesByChannel", async () => {
    await MessageService.getChannelMessages(1);
    expect(database.Messages.findAll).toHaveBeenCalledWith({
      where: { ChannelId: 1 },
      include: [
        {
          model: database.Users,
          attributes: ["username"],
          include: [
            {
              model: database.Warehouse,
              attributes: ["name"],
            },
          ],
        },
        {
          model: database.Comments,
          attributes: ["id"],
        },
        {
          model: database.Channels,
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
      offset: 0,
    });
    try {
      database.Messages.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await MessageService.getChannelMessages(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getUserMessages", async () => {
    await MessageService.getUserMessages("johndoe@email.com");
    expect(database.sequelize.query).toHaveBeenCalledWith(
      `SELECT 
          "Messages".*,
          "Users"."username",
          "Users"."WarehouseId",
          "Warehouses"."name" as "warehouseName",
          "Channels"."name" as "channelName",
	        COUNT("Comments"."id") AS "CommentCount" 
        FROM 
	        "Messages"
          JOIN "Users" ON "Messages"."UserId" = "Users"."id"
          LEFT OUTER JOIN "Warehouses" ON "Warehouses"."id" = "Users"."WarehouseId"
          LEFT OUTER JOIN "Comments" ON "Messages"."id" = "Comments"."MessageId"
	        LEFT OUTER JOIN "Channels" ON "Messages"."ChannelId" = "Channels"."id"
        WHERE 
	        "Messages"."ChannelId" IN (
		        SELECT 
			        "ChannelId"
		        FROM 
			        "Users" 
			      JOIN "UserChannels" ON "Users"."id" = "UserChannels"."UserId"
			      JOIN "Channels" ON "UserChannels"."ChannelId" = "Channels"."id" 
		        WHERE 
			        "email" = :email
	        )
        GROUP BY 
	        "Messages"."id",
          "Users"."username",
          "Users"."WarehouseId",
          "Warehouses"."name",
	        "Channels"."name"
        ORDER BY "Messages"."createdAt" DESC
        LIMIT :limit
        OFFSET :offset`,
      {
        replacements: { email: "johndoe@email.com", limit: 20, offset: 0 },
        type: database.sequelize.QueryTypes.SELECT,
      }
    );

    try {
      database.sequelize.query.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await MessageService.getUserMessages("johndoe@email.com");
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
    const notifiedUsers = await MessageService.getNotifiedUsers(1);
    expect(database.sequelize.query).toHaveBeenCalledWith(
      `SELECT
	                  "Users"."phone",
                    "Providers"."domain",
                    "Notifications"."type"
                  FROM 
                    "Notifications"
                  JOIN "Users" ON "Notifications"."UserId" = "Users"."id"
                  JOIN "Providers" ON "Providers"."id" = "Users"."ProviderId"
                  WHERE 
                    "Notifications"."ChannelId" = :channelId
                  AND
	                  "Users"."archived" IS NULL`,
      {
        replacements: { channelId: 1 },
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
      await MessageService.getNotifiedUsers(1);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
