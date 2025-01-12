export default class Response {
    
  static sendSuccess(res, data = {}, message = "Success", statusCode = 200) {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static sendError(
    res,
    message = "An error occurred",
    statusCode = 500,
    error = null
  ) {
    res.status(statusCode).json({
      success: false,
      message,
      error: error ? error.toString() : null,
    });
  }

  static sendBadRequest(res, message = "Bad Request", data = {}) {
    this.sendError(res, message, 400, data);
  }

  static sendUnauthorized(res, message = "Unauthorized") {
    this.sendError(res, message, 401);
  }

  static sendInternalServerError(res, message = "Internal Server Error") {
    this.sendError(res, message, 500);
  }

  static sendForbidden(res, message = "Forbidden") {
    this.sendError(res, message, 403);
  }

  static sendNotFound(res, message = "Not Found") {
    this.sendError(res, message, 404);
  }

  static sendConflict(res, message = "Conflict") {
    this.sendError(res, message, 409);
  }

  static sendCreated(
    res,
    data = {},
    message = "Resource created successfully"
  ) {
    this.sendSuccess(res, data, message, 201);
  }

  static sendNoContent(res) {
    res.status(204).send();
  }
}
