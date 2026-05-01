class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

class Unauthorized extends AppError {
  constructor(message = "You are not authorized") {
    super(401, message);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource Not found") {
    super(404, message);
  }
}
class Forbidden extends AppError {
  constructor(message = "Access denied") {
    super(403, message);
  }
}
class BadRequest extends AppError {
  constructor(message = "Invalid request") {
    super(400, message);
  }
}

export { NotFoundError, Forbidden, BadRequest, Unauthorized };
