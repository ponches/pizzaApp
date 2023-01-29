import { IdentifiableEntity } from '../../../core/identifiable.entity';

export class User extends IdentifiableEntity {
  constructor(id: string, protected readonly email: string) {
    super(id);
  }

  getEmail(): string {
    return this.email;
  }
}
