"use strict";

// mock CustomError first
jest.mock("../utils/index", () => ({
  CustomError: class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  },
}));

const { isLogin } = require("./permission");

describe("isLogin middleware", () => {

  it("calls next() when user is active", () => {
    const req  = { user: { isActive: true } };
    const res  = {};
    const next = jest.fn();       // ← fake function

    isLogin(req, res, next);

    expect(next).toHaveBeenCalled();       // was it called?
    expect(next).toHaveBeenCalledTimes(1); // called once?
    expect(next).toHaveBeenCalledWith();   // called with no args?
  });

  it("throws when user is missing", () => {
    const req  = { user: null };
    const res  = {};
    const next = jest.fn();

    expect(() => isLogin(req, res, next)).toThrow("NoPermission: You must login");
    expect(next).not.toHaveBeenCalled();   // next must NOT be called
  });

});