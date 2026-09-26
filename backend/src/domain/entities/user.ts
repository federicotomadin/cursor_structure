import { InvalidArgumentError } from '../errors/domain.error';
import { Email } from '../value-objects/email';

export interface UserProps {
  id: string;
  name: string;
  email: Email;
  createdAt: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(input: { id: string; name: string; email: string }, now = new Date()): User {
    const name = input.name.trim();
    if (name.length < 2) {
      throw new InvalidArgumentError('User name must have at least 2 characters');
    }
    return new User({ id: input.id, name, email: Email.create(input.email), createdAt: now });
  }

  static restore(props: UserProps): User {
    return new User(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
