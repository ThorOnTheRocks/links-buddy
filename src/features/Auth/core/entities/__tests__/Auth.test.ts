import { Auth, AuthProvider } from '../Auth';
import { user } from '../../mocks/Auth.mock';

describe('Auth Entity', () => {
  describe('Local Authentication', () => {
    it('should create a valid local Auth entity', () => {
      const auth: Auth = {
        id: '34435435',
        userId: user.id,
        provider: AuthProvider.LOCAL,
        email: user.email,
        passwordHash: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(auth).toMatchObject({
        id: expect.any(String),
        userId: user.id,
        provider: AuthProvider.LOCAL,
        email: user.email,
        passwordHash: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('Social Authentication', () => {
    it('should create a valid social Auth entity', () => {
      const auth: Auth = {
        id: '34435435',
        userId: user.id,
        provider: AuthProvider.GITHUB,
        providerId: 'github123',
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(auth).toMatchObject({
        id: expect.any(String),
        userId: user.id,
        provider: AuthProvider.GITHUB,
        providerId: expect.any(String),
        email: user.email,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('Auth Provider Type', () => {
    it('should only accept valid auth providers', () => {
      const validProviders = [
        AuthProvider.LOCAL,
        AuthProvider.GITHUB,
        AuthProvider.GOOGLE,
      ];

      validProviders.forEach((provider) => {
        const auth: Auth = {
          id: '34435435',
          userId: user.id,
          provider,
          email: user.email,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        expect(auth.provider).toBe(provider);
      });
    });
  });
});
