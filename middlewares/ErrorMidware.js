import ErrorHandler from "../utils/ErrorHandler";

const errorMiddleware = (err, req, res, next) => {
  // const statusCode = res.statusCode === 200 ? 500 : statusCode;
  // const error = { ...err };

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

  // res.status(statusCode).json({
  //   error,
  //   message: error.message,
  //   stack: error.stack,
  // });
  //////
  err.statusCode = err.statusCode || 500;

  let error = { ...err };

  error.message = err.message;

  // Wrong Mongoose Object ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Handling mongoose Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};

export default errorMiddleware;
