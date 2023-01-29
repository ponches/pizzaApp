import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { User } from 'src/users/entities/user/user.entity';
import { Repository } from 'typeorm';
import { UserSchemaFactory } from './user-schema.factory';
import { UserSchema } from './user.schema';

@Injectable()
export class UserEntityRepository extends BaseEntityRepository<UserSchema, User> {
  constructor(
    @InjectRepository(UserSchema)
    usersRepo: Repository<UserSchema>,
    userSchemaFactory: UserSchemaFactory,
  ) {
    super(usersRepo, userSchemaFactory);
  }

  create(entity: User): Promise<User> {
    // User creation allowed only in UserPrivate
    return new Promise(() => entity);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const entitySchema = await this.entityRepo.findOneBy({ email });
    if (!entitySchema) return null;

    return this.entitySchemaFactory.createFromSchema(entitySchema);
  }
}
