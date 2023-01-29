import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { UserPrivate } from 'src/auth/entities/user-private/user-private.entity';
import { UserSchema } from '../../../users/db/user/user.schema';

@Injectable()
export class UserPrivateSchemaFactory implements EntitySchemaFactory<UserSchema, UserPrivate> {
  create(user: UserPrivate): UserSchema {
    return {
      id: user.getId(),
      email: user.getEmail(),
      passwordHash: user.getPasswordHash(),
      createdAt: user.getRegisteredAt(),
      updatedAt: user.getUpdatedAt(),
      refreshTokenHash: user.getRefreshTokenHash(),
      deletedAt: null,
      version: 0,
    };
  }

  createFromSchema(userSchema: UserSchema): UserPrivate {
    return new UserPrivate(
      userSchema.id,
      userSchema.email,
      userSchema.passwordHash,
      userSchema.createdAt,
      userSchema.updatedAt,
      userSchema.refreshTokenHash,
    );
  }
}
