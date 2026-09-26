import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CreateUserForm } from '@/features/users';
import { renderWithProviders } from '../../../utils/render-with-providers';

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const fillAndSubmit = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Nombre'), 'Ada');
  await user.type(screen.getByLabelText('Email'), 'ada@example.com');
  await user.click(screen.getByRole('button', { name: 'Crear' }));
};

describe('CreateUserForm', () => {
  it('posts the user to the API and notifies the caller', async () => {
    const created = {
      id: 'u-1',
      name: 'Ada',
      email: 'ada@example.com',
      createdAt: new Date().toISOString(),
    };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(jsonResponse(created, 201));
    const onCreated = vi.fn();

    renderWithProviders(<CreateUserForm onCreated={onCreated} />);
    await fillAndSubmit();

    await waitFor(() => expect(onCreated).toHaveBeenCalledWith(created));
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/users',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Ada', email: 'ada@example.com' }),
      }),
    );
  });

  it('shows the API error message when creation fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      jsonResponse(
        { statusCode: 409, message: 'A user with email ada@example.com already exists' },
        409,
      ),
    );

    renderWithProviders(<CreateUserForm />);
    await fillAndSubmit();

    expect(await screen.findByRole('alert')).toHaveTextContent('already exists');
  });
});
