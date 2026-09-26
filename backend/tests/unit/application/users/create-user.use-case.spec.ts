import { ConflictError, CreateUserUseCase } from '@app/application';
import { FakeUserRepository, SequentialIdGenerator } from '../../fakes';

describe('CreateUserUseCase', () => {
  const setup = () => {
    const users = new FakeUserRepository();
    const useCase = new CreateUserUseCase(users, new SequentialIdGenerator());
    return { users, useCase };
  };

  it('creates and persists a new user', async () => {
    const { users, useCase } = setup();

    const result = await useCase.execute({ name: 'Ada', email: 'ada@example.com' });

    expect(result).toMatchObject({ id: 'id-1', name: 'Ada', email: 'ada@example.com' });
    expect(await users.findById('id-1')).not.toBeNull();
  });

  it('fails when the email is already registered', async () => {
    const { useCase } = setup();
    await useCase.execute({ name: 'Ada', email: 'ada@example.com' });

    await expect(useCase.execute({ name: 'Other', email: 'ADA@example.com' })).rejects.toThrow(
      ConflictError,
    );
  });
});
