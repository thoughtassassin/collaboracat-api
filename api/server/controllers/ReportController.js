import ReportService from "../services/ReportService";
import Util from "../utils/Utils";
import excel from "exceljs";

const util = new Util();

class ReportController {
  static async getUserReport(req, res) {
    const { beginDate, endDate } = req.body;
    const { userid } = req.params;

    if (!beginDate || !endDate) {
      util.setError(400, "Please input a begin and end date");
      return util.send(res);
    }

    try {
      const Report = await ReportService.getUserReport(
        userid,
        beginDate,
        endDate
      );
      if (Report.length > 0) {
        const reportData = Report.map(report => ({
          Name: report.User.username,
          Channel: report.Channel.name,
          Date: report.createdAt,
          Message: report.content
        }));

        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet("Messages"); //creating worksheet

        //  WorkSheet Header"
        worksheet.columns = [
          { header: "Name", key: "Name", width: 30 },
          { header: "Channel", key: "Channel", width: 30 },
          { header: "Date", key: "Date", width: 30 },
          { header: "Message", key: "Message", width: 30 }
        ];

        // Add Array Rows
        worksheet.addRows(reportData);

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "customer.xlsx"
        );

        return workbook.xlsx.write(res).then(function() {
          res.status(200).end();
        });
      } else {
        util.setSuccess(200, "No Report data available for those parameters");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async getChannelReport(req, res) {
    const { beginDate, endDate } = req.body;
    const { channelid } = req.params;

    if (!beginDate || !endDate) {
      util.setError(400, "Please input a begin and end date");
      return util.send(res);
    }

    try {
      const Report = await ReportService.getChannelReport(
        channelid,
        beginDate,
        endDate
      );
      if (Report.length > 0) {
        const reportData = Report.map(report => ({
          Name: report.User.username,
          Channel: report.Channel.name,
          Date: report.createdAt,
          Message: report.content
        }));

        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet("Messages"); //creating worksheet

        //  WorkSheet Header"
        worksheet.columns = [
          { header: "Name", key: "Name", width: 30 },
          { header: "Channel", key: "Channel", width: 30 },
          { header: "Date", key: "Date", width: 30 },
          { header: "Message", key: "Message", width: 30 }
        ];

        // Add Array Rows
        worksheet.addRows(reportData);

        console.log(reportData);

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "channel.xlsx"
        );

        return workbook.xlsx.write(res).then(function() {
          res.status(200).end();
        });
      } else {
        util.setSuccess(200, "No Report data available for those parameters");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default ReportController;
