import { Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from 'src/auth/auth.service';
import { UserPrivateEntityRepository } from 'src/auth/db/user-private/user-private-entity.repository';
import { UserPrivate } from 'src/auth/entities/user-private/user-private.entity';
import { LoginUserCommand } from './login-user.command';

export type LoginUserCommandOutput = {
  accessToken: string;
  refreshToken: string;
};

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  private readonly logger = new Logger(LoginUserHandler.name);

  constructor(
    private publisher: EventPublisher,
    private readonly userRepo: UserPrivateEntityRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(command: LoginUserCommand): Promise<LoginUserCommandOutput> {
    const user = await this.getUser(command.userId);

    const tokens = await this.authService.createAccessAndRefreshTokens(
      user.getId(),
      user.getEmail(),
    );

    await user.setRefreshTokenHash(tokens.refreshToken);
    user.commit();

    this.logger.log(`User@${user.getEmail()} has logged in`);
    return { ...tokens };
  }

  private async getUser(userId: string): Promise<UserPrivate> {
    const user = await this.userRepo.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.publisher.mergeObjectContext(user);
  }
}
