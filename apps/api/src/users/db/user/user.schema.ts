import { BaseSchema } from 'src/database/base.schema';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UserSchema extends BaseSchema {
  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  refreshTokenHash?: string;
}
