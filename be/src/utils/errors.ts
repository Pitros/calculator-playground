export class BaseError extends Error {
  constructor(
    public status: number,
    public code: string,
    public message: string,
    public additionalData?: unknown
  ) {
    super(message);
  }
}

export class ServerError extends BaseError {
  constructor(additionalData?: unknown) {
    super(500, "SERVER_ERROR", "Server error", additionalData);
  }
}

export class ValidationError extends BaseError {
  constructor(additionalData?: unknown) {
    super(400, "VALIDATION_ERROR", "Validation error", additionalData);
  }
}
