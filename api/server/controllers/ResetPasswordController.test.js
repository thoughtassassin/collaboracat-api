import ResetPasswordController from "./ResetPasswordController";
import ResetPasswordService from "../services/ResetPasswordService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { res } from "../utils/Test";
jest.mock("../services/ResetPasswordService");
jest.mock("@sendgrid/mail");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("ResetPasswordController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("request", async () => {
    //no email
    await ResetPasswordController.request(
      {
        body: {
          url: "http://localhost:3000",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide an email and a url",
      status: "error",
    });

    //no url
    await ResetPasswordController.request(
      {
        body: {
          email: "jdoe@gmail.com",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide an email and a url",
      status: "error",
    });

    // user not found
    ResetPasswordService.getUser.mockImplementationOnce(() => null);
    await ResetPasswordController.request(
      {
        body: {
          email: "jdoe@gmail.com",
          url: "http://localhost:3000",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found.",
      status: "error",
    });

    // url not authorized
    ResetPasswordService.getUser.mockImplementationOnce(() => ({
      email: "jdoe@gmail.com",
    }));
    await ResetPasswordController.request(
      {
        body: {
          email: "jdoe@gmail.com",
          url: "http://bad.url.com",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "URL is not authorized.",
      status: "error",
    });

    // reset password request sent
    jwt.sign.mockImplementationOnce(() => "abcd1234");
    ResetPasswordService.getUser.mockImplementationOnce(() => ({
      id: "1",
      email: "jdoe@gmail.com",
      createdAt: { getTime: jest.fn() },
    }));
    ResetPasswordService.updateUser.mockImplementationOnce(() => ({
      email: "jdoe@gmail.com",
    }));
    await ResetPasswordController.request(
      {
        body: {
          email: "jdoe@gmail.com",
          url: "http://localhost:3000",
        },
      },
      res
    );

    expect(ResetPasswordService.updateUser).toHaveBeenCalledWith("1", {
      reset_token: "abcd1234",
    });
    expect(sgMail.send).toHaveBeenCalledWith({
      to: "jdoe@gmail.com",
      from: "reset-password@collaboracast.com",
      subject: "Reset Password",
      html: `<p>A request to reset your password has been made. To reset your password, <a href="http://localhost:3000/reset-password?email=jdoe@gmail.com&token=abcd1234">click here</a></p>`,
    });
    expect(res.json).toHaveBeenCalledWith({
      data: {
        email: "jdoe@gmail.com",
      },
      message:
        "Request for password reset is successful. Please check your email.",
      status: "success",
    });

    // error
    ResetPasswordService.getUser.mockImplementationOnce(() => ({
      email: "jdoe@gmail.com",
      createdAt: { getTime: jest.fn() },
    }));
    ResetPasswordService.updateUser.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ResetPasswordController.request(
      {
        body: {
          email: "jdoe@gmail.com",
          url: "http://localhost:3000",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "foo",
      status: "error",
    });
  });

  test("reset", async () => {
    //no email
    await ResetPasswordController.reset(
      {
        body: {
          password: "password",
        },
        params: {
          token: "abcd1234",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a password, email and a valid token",
      status: "error",
    });

    //no token
    await ResetPasswordController.reset(
      {
        body: {
          password: "password",
        },
        params: {
          email: "jdoe@gmail.com",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a password, email and a valid token",
      status: "error",
    });

    //no password
    await ResetPasswordController.reset(
      {
        body: {},
        params: {
          email: "jdoe@gmail.com",
          token: "abcd1234",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide a password, email and a valid token",
      status: "error",
    });

    expect(res.json).toHaveBeenCalledTimes(3);

    // no user
    ResetPasswordService.getUser.mockImplementationOnce(() => null);
    await ResetPasswordController.reset(
      {
        body: {
          password: "password",
        },
        params: {
          email: "jdoe@gmail.com",
          token: "abcd1234",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Password reset was unsuccessful",
      status: "error",
    });

    // no user token
    ResetPasswordService.getUser.mockImplementationOnce(() => {});
    await ResetPasswordController.reset(
      {
        body: {
          password: "password",
        },
        params: {
          email: "jdoe@gmail.com",
          token: "abcd1234",
        },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Password reset was unsuccessful",
      status: "error",
    });

    expect(res.json).toHaveBeenCalledTimes(5);

    // reset successful
    bcrypt.hashSync.mockImplementationOnce(() => "mnop5432");
    ResetPasswordService.getUser.mockImplementationOnce(() => ({
      id: "1",
      email: "jdoe@gmail.com",
      password: "1234",
      createdAt: {
        getTime: () => "01/01/2020",
      },
      reset_token: "xyz1098",
    }));
    ResetPasswordService.updateUser.mockImplementationOnce(() => ({
      id: "1",
      email: "jdoe@gmail.com",
    }));
    await ResetPasswordController.reset(
      {
        body: {
          password: "password",
        },
        params: {
          email: "jdoe@gmail.com",
          token: "abcd1234",
        },
      },
      res
    );
    expect(jwt.verify).toBeCalledWith("abcd1234", "123401/01/2020");
    expect(ResetPasswordService.updateUser).toBeCalledWith("1", {
      password: "mnop5432",
      reset_token: null,
    });
    expect(sgMail.send).toHaveBeenCalledWith({
      to: "jdoe@gmail.com",
      from: "reset-password@collaboracast.com",
      subject: "Reset Password Request",
      html: `<p>Your password was successfully reset.</p>`,
    });
    expect(res.json).toHaveBeenCalledWith({
      data: {
        id: "1",
        email: "jdoe@gmail.com",
      },
      message: "Password reset is successful.",
      status: "success",
    });

    // error
    ResetPasswordService.getUser.mockImplementationOnce(() => {
      throw new Error("foo");
    });
    await ResetPasswordController.reset(
      {
        body: {
          password: "password",
        },
        params: {
          email: "jdoe@gmail.com",
          token: "abcd1234",
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
