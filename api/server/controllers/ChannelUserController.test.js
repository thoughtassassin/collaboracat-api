import ChannelUserController from "./ChannelUserController";
import ChannelUserService from "../services/ChannelUserService";
import { res } from "../utils/Test";
jest.mock("../services/ChannelUserService");

describe("ChannelUserController", () => {
  test("getChannelUsers", async () => {
    // missing id in request
    await ChannelUserController.getChannelUsers({ params: "" }, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please input a valid numeric value",
      status: "error",
    });

    // Channel Users in database
    ChannelUserService.getChannelUsers.mockImplementationOnce(() => [
      { username: "foo" },
      { username: "bar" },
    ]);
    await ChannelUserController.getChannelUsers(
      { params: { channelid: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      data: [{ username: "foo" }, { username: "bar" }],
      message: "Found Channel Users",
      status: "success",
    });

    // no Channel Users in database
    ChannelUserService.getChannelUsers.mockImplementationOnce(() => null);
    await ChannelUserController.getChannelUsers(
      { params: { channelid: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot find ChannelUsers with the channel id 1",
      status: "error",
    });

    // error
    ChannelUserService.getChannelUsers.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ChannelUserController.getChannelUsers(
      { params: { channelid: 1 } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });
});
