import { Logger, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from 'src/auth/auth.service';
import { UserPrivateEntityRepository } from 'src/auth/db/user-private/user-private-entity.repository';
import { UserPrivate } from 'src/auth/entities/user-private/user-private.entity';
import { UserPrivateFactory } from 'src/auth/entities/user-private/user-private.factory';
import { RegisterUserCommand } from './register-user.command';

export type RegisterUserCommandOutput = {
  accessToken: string;
  refreshToken: string;
};

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  private readonly logger = new Logger(RegisterUserHandler.name);

  constructor(
    private publisher: EventPublisher,
    private readonly userRepo: UserPrivateEntityRepository,
    private readonly userPrivateFactory: UserPrivateFactory,
    private readonly authService: AuthService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<RegisterUserCommandOutput> {
    const { email, password } = command;
    await this.checkIfEmailIsOccupied(email);

    const user = await this.createUser(email, password);
    const tokens = await this.authService.createAccessAndRefreshTokens(user.getId(), email);

    await user.setRefreshTokenHash(tokens.refreshToken);
    user.commit();

    return tokens;
  }

  private async checkIfEmailIsOccupied(email: string): Promise<void> {
    const user = await this.userRepo.findOneByEmail(email);
    if (user) throw new ForbiddenException('Email already occupied');
  }

  private async createUser(email: string, password: string): Promise<UserPrivate> {
    this.logger.log(`Registering user ${email}`);
    const user = await this.userPrivateFactory.create(email, password);
    return this.publisher.mergeObjectContext(user);
  }
}
