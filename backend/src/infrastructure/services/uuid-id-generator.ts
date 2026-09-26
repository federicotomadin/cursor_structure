import { randomUUID } from 'node:crypto';
import { IdGenerator } from '@app/application';

export class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return randomUUID();
  }
}
