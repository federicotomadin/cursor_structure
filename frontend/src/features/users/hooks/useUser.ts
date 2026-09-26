import { useQuery } from '@tanstack/react-query';
import { usersApi, usersKeys } from '../api/users.api';

export function useUser(id: string) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: Boolean(id),
  });
}
