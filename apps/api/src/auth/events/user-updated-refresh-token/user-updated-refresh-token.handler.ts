import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserPrivateEntityRepository } from 'src/auth/db/user-private/user-private-entity.repository';
import { UserUpdatedRefreshTokenEvent } from './user-updated-refresh-token.event';

@EventsHandler(UserUpdatedRefreshTokenEvent)
export class UserUpdatedRefreshTokenHandler implements IEventHandler<UserUpdatedRefreshTokenEvent> {
  constructor(private readonly userRepo: UserPrivateEntityRepository) {}

  async handle(event: UserUpdatedRefreshTokenEvent) {
    const { userId, refreshTokenHash } = event;
    await this.userRepo.updateOneRefreshTokenHash(userId, refreshTokenHash);
  }
}
