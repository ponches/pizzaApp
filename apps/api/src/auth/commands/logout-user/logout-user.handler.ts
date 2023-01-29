import { Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserPrivateEntityRepository } from 'src/auth/db/user-private/user-private-entity.repository';
import { UserPrivate } from 'src/auth/entities/user-private/user-private.entity';
import { LogoutUserCommand } from './logout-user.command';

@CommandHandler(LogoutUserCommand)
export class LogoutUserHandler implements ICommandHandler<LogoutUserCommand> {
  private readonly logger = new Logger(LogoutUserHandler.name);

  constructor(
    private publisher: EventPublisher,
    private readonly userRepo: UserPrivateEntityRepository,
  ) {}

  async execute(command: LogoutUserCommand): Promise<void> {
    const user = await this.getUser(command.userId);

    await user.setRefreshTokenHash(null);
    user.commit();

    this.logger.log(`User@${user.getEmail()} has logged out`);
  }

  private async getUser(userId: string): Promise<UserPrivate> {
    const user = await this.userRepo.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.publisher.mergeObjectContext(user);
  }
}
