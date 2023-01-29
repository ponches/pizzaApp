import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { RefreshAccessTokenCommand } from './refresh-access-token.command';
import { AuthService } from 'src/auth/auth.service';
import { RefreshAccessTokenResponseDto } from 'src/auth/dto/refresh-access-token/refresh-access-token-response.dto';
import { UserPrivateEntityRepository } from 'src/auth/db/user-private/user-private-entity.repository';
import { UserPrivate } from 'src/auth/entities/user-private/user-private.entity';

export type RefreshAccessTokenCommandOutput = {
  accessToken: string;
  refreshToken: string;
};

@CommandHandler(RefreshAccessTokenCommand)
export class RefreshAccessTokenHandler implements ICommandHandler<RefreshAccessTokenCommand> {
  private readonly logger = new Logger(RefreshAccessTokenHandler.name);

  constructor(
    private publisher: EventPublisher,
    private readonly userRepo: UserPrivateEntityRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(command: RefreshAccessTokenCommand): Promise<RefreshAccessTokenCommandOutput> {
    const user = await this.getUser(command.userId);

    const refreshTokenMatch = await user.compareRefreshToken(command.refreshToken);
    if (!refreshTokenMatch) throw new UnauthorizedException();

    const tokens = await this.authService.createAccessAndRefreshTokens(
      user.getId(),
      user.getEmail(),
    );

    await user.setRefreshTokenHash(tokens.refreshToken);
    user.commit();

    this.logger.log(`User@${user.getEmail()} refreshed access token`)
    return { ...tokens };
  }

  private async getUser(userId: string): Promise<UserPrivate> {
    const user = await this.userRepo.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.publisher.mergeObjectContext(user);
  }
}
