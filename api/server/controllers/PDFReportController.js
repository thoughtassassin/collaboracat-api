import PDFReportService from "../services/PDFReportService";
import PDFDocument from "pdfkit";
import moment from "moment";
import Util from "../utils/Utils";
import addMessagesAndComments from "../utils/PDFUtils";

const util = new Util();

class PDFReportController {
  static async getUserReport(req, res) {
    const { beginDate, endDate } = req.body;
    const { userid } = req.params;

    if (!beginDate || !endDate) {
      util.setError(400, "Please input a begin and end date");
      return util.send(res);
    }

    try {
      const Report = await PDFReportService.getUserReport(
        userid,
        beginDate,
        endDate
      );
      if (Report.length > 0) {
        const formatComments = (comments) =>
          comments.map((comment) => ({
            employee: comment.User.username,
            office: comment.User.Warehouse.name,
            message: comment.content,
            time: moment(comment.createdAt).format("MMM DD, YYYY h:mm a"),
          }));

        const reportData = Report.map((report) => ({
          company: report.Channel.name,
          employee: report.User.username,
          office: report.User.Warehouse.name,
          time: moment(report.createdAt).format("MMM DD, YYYY h:mm a"),
          message: report.content,
          comments: formatComments(report.Comments),
        }));

        const document = new PDFDocument({ bufferPages: true });

        let buffers = [];
        document.on("data", buffers.push.bind(buffers));
        document.on("end", () => {
          const pdfData = Buffer.concat(buffers);
          res.writeHead(200, {
            "Content-Length": Buffer.byteLength(pdfData),
            "Content-Type": "application/pdf",
            "Content-disposition": "attachment;filename=report.pdf",
          });
          res.end(pdfData);
        });

        document.font("Helvetica").fontSize(18).text("Don-Nan Report", {
          lineGap: 40,
        });

        addMessagesAndComments(document, reportData);
        document.end();
      } else {
        util.setSuccess(200, "No Report data available for those parameters");
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error.message);
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
      const Report = await PDFReportService.getChannelReport(
        channelid,
        beginDate,
        endDate
      );

      if (Report.length > 0) {
        const formatComments = (comments) =>
          comments.map((comment) => ({
            employee: comment.User.username,
            office: comment.User.Warehouse.name,
            message: comment.content,
            time: moment(comment.createdAt).format("MMM DD, YYYY h:mm a"),
          }));

        const reportData = Report.map((report) => ({
          company: report.Channel.name,
          employee: report.User.username,
          office: report.User.Warehouse.name,
          time: moment(report.createdAt).format("MMM DD, YYYY h:mm a"),
          message: report.content,
          comments: formatComments(report.Comments),
        }));

        const document = new PDFDocument({ bufferPages: true });

        let buffers = [];
        document.on("data", buffers.push.bind(buffers));
        document.on("end", () => {
          const pdfData = Buffer.concat(buffers);
          res.writeHead(200, {
            "Content-Length": Buffer.byteLength(pdfData),
            "Content-Type": "application/pdf",
            "Content-disposition": "attachment;filename=report.pdf",
          });
          res.end(pdfData);
        });

        document.font("Helvetica").fontSize(18).text("Don-Nan Report", {
          lineGap: 40,
        });

        addMessagesAndComments(document, reportData);
        document.end();
      } else {
        util.setSuccess(200, "No Report data available for those parameters");
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default PDFReportController;
