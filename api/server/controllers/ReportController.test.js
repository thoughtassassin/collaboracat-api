import ReportController from "./ReportController";
import ReportService from "../services/ReportService";
import { res } from "../utils/Test";
import excel from "exceljs";
const worksheet = {
  columns: [],
  addRows: jest.fn(),
};
excel.Workbook = jest.fn(() => ({
  addWorksheet: jest.fn(() => worksheet),
  xlsx: {
    write: jest.fn((res) => Promise.resolve(res)),
  },
}));
jest.mock("../services/ReportService");

describe("ReportController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getUserReport", async () => {
    // no begin date
    await ReportController.getUserReport(
      {
        body: {
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a begin and end date",
      status: "error",
    });

    // no end date
    await ReportController.getUserReport(
      {
        body: {
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a begin and end date",
      status: "error",
    });

    // no report for given parameters
    ReportService.getUserReport.mockImplementationOnce(() => []);
    await ReportController.getUserReport(
      {
        body: {
          beginDate: new Date(),
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "No Report data available for those parameters",
      status: "success",
    });

    // report
    ReportService.getUserReport.mockImplementationOnce(() => [
      {
        User: { username: "John" },
        Channel: { name: "foo" },
        createdAt: "01/01/2020",
        content: "bar",
      },
      {
        User: { username: "Jane" },
        Channel: { name: "baz" },
        createdAt: "01/01/2020",
        content: "qux",
      },
    ]);
    await ReportController.getUserReport(
      {
        body: {
          beginDate: new Date(),
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(worksheet.columns).toEqual([
      {
        header: "Name",
        key: "Name",
        width: 30,
      },
      {
        header: "Channel",
        key: "Channel",
        width: 30,
      },
      {
        header: "Date",
        key: "Date",
        width: 30,
      },
      {
        header: "Message",
        key: "Message",
        width: 30,
      },
    ]);
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Disposition",
      "attachment; filename=" + "customer.xlsx"
    );
    expect(worksheet.addRows).toHaveBeenCalledWith([
      {
        Name: "John",
        Channel: "foo",
        Date: "01/01/2020",
        Message: "bar",
      },
      {
        Name: "Jane",
        Channel: "baz",
        Date: "01/01/2020",
        Message: "qux",
      },
    ]);

    // error
    ReportService.getUserReport.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ReportController.getUserReport(
      {
        body: {
          beginDate: new Date(),
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
  test("getChannelReport", async () => {
    // no begin date
    await ReportController.getChannelReport(
      {
        body: {
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a begin and end date",
      status: "error",
    });

    // no end date
    await ReportController.getChannelReport(
      {
        body: {
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a begin and end date",
      status: "error",
    });

    // no report for given parameters
    ReportService.getChannelReport.mockImplementationOnce(() => []);
    await ReportController.getChannelReport(
      {
        body: {
          beginDate: new Date(),
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "No Report data available for those parameters",
      status: "success",
    });

    // report
    ReportService.getChannelReport.mockImplementationOnce(() => [
      {
        User: { username: "John" },
        Channel: { name: "foo" },
        createdAt: "01/01/2020",
        content: "bar",
      },
      {
        User: { username: "Jane" },
        Channel: { name: "baz" },
        createdAt: "01/01/2020",
        content: "qux",
      },
    ]);
    await ReportController.getChannelReport(
      {
        body: {
          beginDate: new Date(),
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(worksheet.columns).toEqual([
      {
        header: "Name",
        key: "Name",
        width: 30,
      },
      {
        header: "Channel",
        key: "Channel",
        width: 30,
      },
      {
        header: "Date",
        key: "Date",
        width: 30,
      },
      {
        header: "Message",
        key: "Message",
        width: 30,
      },
    ]);
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Disposition",
      "attachment; filename=" + "channel.xlsx"
    );
    expect(worksheet.addRows).toHaveBeenCalledWith([
      {
        Name: "John",
        Channel: "foo",
        Date: "01/01/2020",
        Message: "bar",
      },
      {
        Name: "Jane",
        Channel: "baz",
        Date: "01/01/2020",
        Message: "qux",
      },
    ]);

    // error
    ReportService.getChannelReport.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ReportController.getChannelReport(
      {
        body: {
          beginDate: new Date(),
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
