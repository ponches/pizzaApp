import { Column } from 'typeorm';

export abstract class IdentifiableEntitySchema {
  @Column()
  readonly id: string;
}
