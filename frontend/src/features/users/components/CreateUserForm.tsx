import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { useCreateUser } from '../hooks/useCreateUser';
import type { User } from '../types';

interface CreateUserFormProps {
  onCreated?: (user: User) => void;
}

export function CreateUserForm({ onCreated }: CreateUserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const createUser = useCreateUser();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser.mutate({ name, email }, { onSuccess: (user) => onCreated?.(user) });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      {createUser.error && <p role="alert">{createUser.error.message}</p>}
      <Button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating…' : 'Create'}
      </Button>
    </form>
  );
}
