import { InvalidArgumentError, User } from '@app/domain';

describe('User', () => {
  it('creates a user with a normalized email and trimmed name', () => {
    const user = User.create({ id: 'u-1', name: '  Ada  ', email: ' ADA@Example.com ' });

    expect(user.name).toBe('Ada');
    expect(user.email.value).toBe('ada@example.com');
  });

  it('rejects names shorter than 2 characters', () => {
    expect(() => User.create({ id: 'u-1', name: 'A', email: 'a@example.com' })).toThrow(
      InvalidArgumentError,
    );
  });

  it('rejects invalid emails', () => {
    expect(() => User.create({ id: 'u-1', name: 'Ada', email: 'not-an-email' })).toThrow(
      InvalidArgumentError,
    );
  });
});
