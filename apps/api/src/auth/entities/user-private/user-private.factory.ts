import { Injectable } from '@nestjs/common';
import { UserPrivateEntityRepository } from 'src/auth/db/user-private/user-private-entity.repository';
import { EntityFactory } from 'src/core/entity.factory';
import { UserPrivate } from './user-private.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPrivateFactory implements EntityFactory<UserPrivate> {
  constructor(private readonly userPrivateEntityRepository: UserPrivateEntityRepository) {}

  async create(email: string, password: string): Promise<UserPrivate> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.userPrivateEntityRepository.create(
      new UserPrivate(null, email, passwordHash, null, null, null),
    );
    return user;
  }
}
