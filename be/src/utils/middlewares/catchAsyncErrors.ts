import { RequestHandler } from "express";

const catchAsyncErrors =
  (handler: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch((err) => next(err));
  };

export default catchAsyncErrors;
