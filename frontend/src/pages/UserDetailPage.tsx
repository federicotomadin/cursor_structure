import { useParams } from 'react-router-dom';
import { UserCard, useUser } from '@/features/users';

export function UserDetailPage() {
  const { id = '' } = useParams();
  const { data: user, isPending, error } = useUser(id);

  if (isPending) return <p>Loading…</p>;
  if (error) return <p role="alert">{error.message}</p>;
  return <UserCard user={user} />;
}
