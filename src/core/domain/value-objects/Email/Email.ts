import { EmailValidationError } from './validation/email-validation.error';
import { EMAIL_ERRORS } from './Email.constants';

export class Email {
  private readonly value: string;
  private static readonly MAX_LENGTH: number = 255;
  private static readonly MIN_LENGTH = 3;
  private static readonly EMAIL_REGEX =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(email: string) {
    const normalizedEmail = this.normalizeEmail(email);
    this.validateEmail(normalizedEmail);
    this.value = normalizedEmail;
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private validateEmail(email: string): void {
    if (!Email.EMAIL_REGEX.test(email)) {
      throw new EmailValidationError(
        EMAIL_ERRORS.INVALID_FORMAT.message,
        EMAIL_ERRORS.INVALID_FORMAT.code,
        email
      );
    }

    if (email.length < Email.MIN_LENGTH) {
      throw new EmailValidationError(
        EMAIL_ERRORS.TOO_SHORT.message,
        EMAIL_ERRORS.TOO_SHORT.code,
        email
      );
    }

    if (email.length > Email.MAX_LENGTH) {
      throw new EmailValidationError(
        EMAIL_ERRORS.TOO_LONG.message,
        EMAIL_ERRORS.TOO_LONG.code,
        email
      );
    }
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }
}
