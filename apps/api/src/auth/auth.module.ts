import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAccessTokenStrategy } from './strategies/jwtAccessToken.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwtRefreshToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/users/db/user/user.schema';
import { UserPrivateEntityRepository } from './db/user-private/user-private-entity.repository';
import { UserPrivateFactory } from './entities/user-private/user-private.factory';
import { UserPrivateSchemaFactory } from './db/user-private/user-private-schema.factory';
import { RegisterUserHandler } from './commands/register-user/register-user.handler';
import { LoginUserHandler } from './commands/login-user/login-user.handler';
import { RefreshAccessTokenHandler } from './commands/refresh-access-token/refresh-access-token.handler';
import { UserUpdatedRefreshTokenHandler } from './events/user-updated-refresh-token/user-updated-refresh-token.handler';
import { LogoutUserHandler } from './commands/logout-user/logout-user.handler';
import { CqrsModule } from '@nestjs/cqrs';

const commandHandlers = [RegisterUserHandler, LoginUserHandler, RefreshAccessTokenHandler, LogoutUserHandler];
const eventHandlers = [UserUpdatedRefreshTokenHandler];

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: 60 * 60 },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserSchema]),
    CqrsModule,
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    UserPrivateEntityRepository,
    UserPrivateFactory,
    UserPrivateSchemaFactory,
    ...commandHandlers,
    ...eventHandlers,
  ],
  exports: [AuthService],
})
export class AuthModule {}
