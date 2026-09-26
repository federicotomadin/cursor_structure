import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, usersKeys } from '../api/users.api';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: (user) => queryClient.setQueryData(usersKeys.detail(user.id), user),
  });
}
