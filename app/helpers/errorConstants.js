export const ERROR_TYPES = {
  VALIDATION_ERROR: 'ValidationError',
  DUPLICATE_KEY: 11000,
  NOT_FOUND: 'NotFoundError',
  AUTH_ERROR: 'AuthError'
}

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  DUPLICATE_KEY: (field) => `${field} already exists`,
  SERVER_ERROR: 'Internal Server Error'
}
