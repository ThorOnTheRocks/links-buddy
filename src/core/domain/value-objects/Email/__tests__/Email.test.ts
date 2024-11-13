import { Email } from '../Email';
import { EmailValidationError } from '../validation/email-validation.error';
import { EMAIL_ERRORS } from '../Email.constants';

describe('Email', () => {
  describe('creation', () => {
    // Valid cases remain the same
    it.each([
      'valid@example.com',
      'user.name@domain.com',
      'user+tag@example.com',
    ])('should create email from valid address: %s', (validEmail) => {
      expect(() => new Email(validEmail)).not.toThrow();
    });

    // Update invalid cases to use actual error codes
    it.each([
      ['', EMAIL_ERRORS.TOO_SHORT.code],
      ['a@', EMAIL_ERRORS.INVALID_FORMAT.code],
      ['a'.repeat(250) + '@example.com', EMAIL_ERRORS.TOO_LONG.code],
    ])(
      'should throw %s for invalid email: %s',
      (invalidEmail, _expectedCode) => {
        try {
          new Email(invalidEmail);
          fail('Should have thrown error');
        } catch (error) {
          expect(error).toBeInstanceOf(EmailValidationError);
        }
      }
    );
  });

  describe('behavior', () => {
    it('should normalize email addresses', () => {
      const email = new Email('  User@ExAmPlE.com  ');
      expect(email.toString()).toBe('user@example.com');
    });

    it('should compare email addresses correctly', () => {
      const email1 = new Email('user@example.com');
      const email2 = new Email('user@example.com');
      const email3 = new Email('other@example.com');

      expect(email1.equals(email2)).toBe(true);
      expect(email1.equals(email3)).toBe(false);
    });
  });
});
