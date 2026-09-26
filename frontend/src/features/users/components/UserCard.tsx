import type { User } from '../types';

export function UserCard({ user }: { user: User }) {
  return (
    <article className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <small>Created: {new Date(user.createdAt).toLocaleString()}</small>
    </article>
  );
}
