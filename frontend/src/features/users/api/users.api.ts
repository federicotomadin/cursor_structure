import { httpClient } from '@/shared/api/http-client';
import type { CreateUserInput, User } from '../types';

export const usersApi = {
  create: (input: CreateUserInput) => httpClient.post<User>('/users', input),
  getById: (id: string) => httpClient.get<User>(`/users/${id}`),
};

export const usersKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...usersKeys.all, id] as const,
};
