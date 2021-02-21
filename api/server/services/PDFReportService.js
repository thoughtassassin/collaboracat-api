import database from "../src/models";

class PDFReportService {
  static async getUserReport(UserId, beginDate, endDate) {
    try {
      return await database.Messages.findAll({
        where: {
          UserId: Number(UserId),
          createdAt: { [database.Sequelize.Op.between]: [beginDate, endDate] },
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
            attributes: ["createdAt", "content"],
            include: [
              {
                model: database.Users,
                attributes: ["username"],
                include: [
                  {
                    model: database.Warehouse,
                    attributes: ["name"],
                  },
                  {
                    model: database.Channels,
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
          {
            model: database.Channels,
            attributes: ["name"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw error;
    }
  }
  static async getChannelReport(ChannelId, beginDate, endDate) {
    try {
      return await database.Messages.findAll({
        where: {
          ChannelId: Number(ChannelId),
          createdAt: { [database.Sequelize.Op.between]: [beginDate, endDate] },
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
            attributes: ["createdAt", "content"],
            include: [
              {
                model: database.Users,
                attributes: ["username"],
                include: [
                  {
                    model: database.Warehouse,
                    attributes: ["name"],
                  },
                  {
                    model: database.Channels,
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
          {
            model: database.Channels,
            attributes: ["name"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw error;
    }
  }
}

export default PDFReportService;
