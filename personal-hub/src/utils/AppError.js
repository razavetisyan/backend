class AppError extends Error {
  constructor(m, statusCode = 500) {
    super(m);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = { AppError };
