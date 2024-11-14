import { User } from '../User';

describe('User Entity', () => {
  it('should create a valid user entity', () => {
    const user: User = {
      id: '423345',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      username: 'therealjohndoe',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('john.doe@gmail.com');
  });
});
