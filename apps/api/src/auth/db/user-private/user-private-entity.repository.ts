import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { UserPrivate } from 'src/auth/entities/user-private/user-private.entity';
import { Repository } from 'typeorm';
import { UserPrivateSchemaFactory } from './user-private-schema.factory';
import { UserSchema } from '../../../users/db/user/user.schema';

@Injectable()
export class UserPrivateEntityRepository extends BaseEntityRepository<UserSchema, UserPrivate> {
  private readonly logger = new Logger(UserPrivateEntityRepository.name);
  constructor(
    @InjectRepository(UserSchema)
    usersRepo: Repository<UserSchema>,
    userPrivateSchemaFactory: UserPrivateSchemaFactory,
  ) {
    super(usersRepo, userPrivateSchemaFactory);
  }

  async create(entity: UserPrivate): Promise<UserPrivate> {
    const entitySchema = await this.entityRepo.save(
      this.entityRepo.create({
        email: entity.getEmail(),
        passwordHash: entity.getPasswordHash(),
      }),
    );
    return this.entitySchemaFactory.createFromSchema(entitySchema);
  }

  async findOneByEmail(email: string): Promise<UserPrivate | null> {
    const entitySchema = await this.entityRepo.findOneBy({ email });
    if (!entitySchema) return null;

    return this.entitySchemaFactory.createFromSchema(entitySchema);
  }

  async updateOneRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void> {
    const entitySchema = await this.findOneById(userId);
    if (!entitySchema) {
      this.logger.warn(`Cannot update user refresh token, user@${userId} not found`);
      return;
    }
    await this.entityRepo.update(userId, { refreshTokenHash, updatedAt: new Date() });
  }
}
