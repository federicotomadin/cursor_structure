import { randomUUID } from 'node:crypto';

export const uniqueEmail = (prefix = 'e2e'): string => `${prefix}-${randomUUID()}@example.com`;
