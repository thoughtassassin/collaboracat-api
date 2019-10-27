export default class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  getToken(headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(" ");
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = "success";
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = "error";
  }

  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data
    };

    if (this.type === "success") {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message
    });
  }
}
