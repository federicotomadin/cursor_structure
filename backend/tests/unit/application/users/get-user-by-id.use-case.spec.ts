import { GetUserByIdUseCase, NotFoundError } from '@app/application';
import { User } from '@app/domain';
import { FakeUserRepository } from '../../fakes';

describe('GetUserByIdUseCase', () => {
  it('returns the user as a DTO', async () => {
    const users = new FakeUserRepository();
    await users.save(User.create({ id: 'u-1', name: 'Ada', email: 'ada@example.com' }));

    const result = await new GetUserByIdUseCase(users).execute('u-1');

    expect(result).toMatchObject({ id: 'u-1', name: 'Ada', email: 'ada@example.com' });
  });

  it('throws NotFoundError when the user does not exist', async () => {
    await expect(
      new GetUserByIdUseCase(new FakeUserRepository()).execute('missing'),
    ).rejects.toThrow(NotFoundError);
  });
});
