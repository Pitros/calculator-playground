import { ErrorRequestHandler } from "express";
import { BaseError } from "../errors";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof BaseError) {
    return res.status(err.status).json({
      success: false,
      error: err.code,
      message: err.message,
      data: err.additionalData,
    });
  }

  if (err) {
    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: "Server error",
      data: {
        message: err.message,
      },
    });
  }
};

export default errorHandler;
