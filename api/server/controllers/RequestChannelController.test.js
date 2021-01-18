import RequestChannelController from "./RequestChannelController";
import RequestChannelService from "../services/RequestChannelService";
import sgMail from "@sendgrid/mail";
import { res } from "../utils/Test";
jest.mock("../services/RequestChannelService");
jest.mock("@sendgrid/mail");

describe("RequestChannelController", () => {
  test("requestChannel", async () => {
    //no channel name
    await RequestChannelController.requestChannel(
      {
        body: {
          username: "John Doe",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a channel name and a username",
      status: "error",
    });

    //no username
    await RequestChannelController.requestChannel(
      {
        body: {
          name: "foo",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a channel name and a username",
      status: "error",
    });

    // no admin users
    RequestChannelService.getAdminUsers.mockImplementationOnce(() => []);
    await RequestChannelController.requestChannel(
      {
        body: {
          name: "foo",
          username: "John Doe",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "No Admin Users found",
      status: "success",
    });

    // send request
    RequestChannelService.getAdminUsers.mockImplementationOnce(() => [
      { email: "johndoe@gmail.com" },
      { email: "janedoe@gmail.com" },
    ]);
    await RequestChannelController.requestChannel(
      {
        body: {
          name: "foo",
          username: "John Doe",
        },
      },
      res
    );
    expect(sgMail.send).toHaveBeenCalledWith({
      to: ["johndoe@gmail.com", "janedoe@gmail.com"],
      from: "channel-requests@collaboracast.com",
      subject: "Channel Request",
      html: `<p>Channel Request: <strong>foo</strong></p><p>From: John Doe</p>`,
    });
    expect(res.json).toHaveBeenCalledWith({
      data: [{ email: "johndoe@gmail.com" }, { email: "janedoe@gmail.com" }],
      message: "Request for channel is successful.",
      status: "success",
    });

    // error
    RequestChannelService.getAdminUsers.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await RequestChannelController.requestChannel(
      {
        body: {
          name: "foo",
          username: "John Doe",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
