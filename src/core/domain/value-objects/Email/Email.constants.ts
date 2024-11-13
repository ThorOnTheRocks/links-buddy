export const EMAIL_ERRORS = {
  INVALID_FORMAT: {
    code: 'EMAIL_001',
    message: 'Email format is invalid',
  },
  TOO_SHORT: {
    code: 'EMAIL_002',
    message: 'Email format is too short',
  },
  TOO_LONG: {
    code: 'EMAIL_003',
    message: 'Email is too long',
  },
} as const;
