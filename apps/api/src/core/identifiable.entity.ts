import { Entity } from './entity';

export abstract class IdentifiableEntity extends Entity {
  constructor(protected readonly id: string) {
    super();
  }

  getId(): string {
    return this.id;
  }
}
