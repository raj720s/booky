import ErrorHandler from "../utils/ErrorHandler";

export default (err, req, res, next) => {
  // err.statusCode = err.statusCode || 500;
  const statusCode = res.statusCode === 200 ? 500 : statusCode;

  // let error = { ...err };

  // error.message = err.message;

  // // Wrong Mongoose Object ID Error
  // if (err.name === "CastError") {
  //   const message = `Resource not found. Invalid: ${err.path}`;
  //   error = new ErrorHandler(message, 400);
  // }

  // // Handling mongoose Validation error
  // if (err.name === "ValidationError") {
  //   const message = Object.values(err.errors).map((value) => value.message);
  //   error = new ErrorHandler(message, 400);
  // }

  res.status(statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
