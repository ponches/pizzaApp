import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './db/user/user.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntityRepository } from './db/user/user-entity.repository';
import { UserSchemaFactory } from './db/user/user-schema.factory';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [UsersService, UserEntityRepository, UserSchemaFactory],
  exports: [UsersService, UserEntityRepository, UserSchemaFactory],
})
export class UsersModule {}
