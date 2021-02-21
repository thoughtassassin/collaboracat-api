import PDFReportController from "./PDFReportController";
import PDFReportService from "../services/PDFReportService";
import { res } from "../utils/Test";
import addMessagesAndComments from "../utils/PDFUtils";

jest.mock("../services/PDFReportService");
jest.mock("../utils/PDFUtils");
jest.mock("pdfkit", () =>
  jest.fn().mockImplementation(() => ({
    font: jest.fn().mockReturnThis(),
    fontSize: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
    on: jest.fn(),
  }))
);
addMessagesAndComments.mockImplementation(() => jest.fn());

describe("PDFReportController", () => {
  const realBuffer = Buffer;
  beforeEach(() => {
    Buffer = jest.fn(() => ({
      byteLength: () => 42,
      concat: () => jest.fn(),
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
    Buffer = realBuffer;
  });
  test("getUserReport", async () => {
    // no begin date
    await PDFReportController.getUserReport(
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
    await PDFReportController.getUserReport(
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
    PDFReportService.getUserReport.mockImplementationOnce(() => []);
    await PDFReportController.getUserReport(
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
    PDFReportService.getUserReport.mockImplementationOnce(() => [
      {
        User: {
          username: "John",
          Warehouse: {
            name: "Corporate",
          },
        },
        Channel: { name: "foo" },
        createdAt: "2020-01-01",
        content: "bar",
        Comments: [
          {
            User: {
              username: "Jane",
              Warehouse: {
                name: "Austin",
              },
            },
            content: "baz",
            createdAt: "2020-01-02",
          },
        ],
      },
    ]);
    await PDFReportController.getUserReport(
      {
        body: {
          beginDate: new Date(),
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(addMessagesAndComments.mock.calls[0][1]).toEqual([
      {
        company: "foo",
        employee: "John",
        office: "Corporate",
        time: "Jan 01, 2020 12:00 am",
        message: "bar",
        comments: [
          {
            employee: "Jane",
            office: "Austin",
            message: "baz",
            time: "Jan 02, 2020 12:00 am",
          },
        ],
      },
    ]);

    // error
    PDFReportService.getUserReport.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await PDFReportController.getUserReport(
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
    await PDFReportController.getChannelReport(
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
    await PDFReportController.getChannelReport(
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
    PDFReportService.getChannelReport.mockImplementationOnce(() => []);
    await PDFReportController.getChannelReport(
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
    PDFReportService.getChannelReport.mockImplementationOnce(() => [
      {
        User: {
          username: "John",
          Warehouse: {
            name: "Corporate",
          },
        },
        Channel: { name: "foo" },
        createdAt: "2020-01-01",
        content: "bar",
        Comments: [
          {
            User: {
              username: "Jane",
              Warehouse: {
                name: "Austin",
              },
            },
            content: "baz",
            createdAt: "2020-01-02",
          },
        ],
      },
    ]);
    await PDFReportController.getChannelReport(
      {
        body: {
          beginDate: new Date(),
          endDate: new Date(),
        },
        params: { userid: 1 },
      },
      res
    );
    expect(addMessagesAndComments.mock.calls[0][1]).toEqual([
      {
        company: "foo",
        employee: "John",
        office: "Corporate",
        time: "Jan 01, 2020 12:00 am",
        message: "bar",
        comments: [
          {
            employee: "Jane",
            office: "Austin",
            message: "baz",
            time: "Jan 02, 2020 12:00 am",
          },
        ],
      },
    ]);

    // error
    PDFReportService.getChannelReport.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await PDFReportController.getChannelReport(
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
