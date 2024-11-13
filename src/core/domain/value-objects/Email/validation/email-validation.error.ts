export class EmailValidationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly value: string
  ) {
    super(message);
    this.name = 'EmailValidationError';
  }
}
