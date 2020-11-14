import Utils from "./Utils";

describe("Utils", () => {
  test("Utils.getToken", () => {
    const util = new Utils();
    const token = util.getToken({ authorization: "Bearer 1234" });
    expect(token).toEqual("1234");
    const noToken = util.getToken({ authorization: "Bearer" });
    expect(noToken).toEqual(null);
    const noArguments = util.getToken();
    expect(noArguments).toEqual(null);
  });
});
