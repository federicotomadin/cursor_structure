import { useNavigate } from 'react-router-dom';
import { CreateUserForm } from '@/features/users';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <section>
      <h1>Crear usuario</h1>
      <CreateUserForm onCreated={(user) => navigate(`/users/${user.id}`)} />
    </section>
  );
}
