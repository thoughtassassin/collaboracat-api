import ReportService from "./ReportService";
import database from "../src/models";
jest.mock("../src/models");

describe("ReportService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getUserReport", async () => {
    await ReportService.getUserReport(1, "2020-02-08", "2020-05-25");
    expect(database.Messages.findAll).toHaveBeenCalledWith({
      where: {
        UserId: 1,
        createdAt: {
          [database.Sequelize.Op.between]: ["2020-02-08", "2020-05-25"],
        },
      },
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
    });
    try {
      database.Messages.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ReportService.getUserReport(1, "2020-02-08", "2020-05-25");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test("getUserReport", async () => {
    await ReportService.getChannelReport(1, "2020-02-08", "2020-05-25");
    expect(database.Messages.findAll).toHaveBeenCalledWith({
      where: {
        ChannelId: 1,
        createdAt: {
          [database.Sequelize.Op.between]: ["2020-02-08", "2020-05-25"],
        },
      },
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
    });
    try {
      database.Messages.findAll.mockImplementationOnce(() => {
        throw new Error("foo");
      });
      await ReportService.getChannelReport(1, "2020-02-08", "2020-05-25");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
