import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../../../users/entities/user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserUpdatedRefreshTokenEvent } from 'src/auth/events/user-updated-refresh-token/user-updated-refresh-token.event';

export class UserPrivate extends User {
  constructor(
    id: string,
    email: string,
    private passwordHash: string,
    private readonly registeredAt: Date,
    private updatedAt: Date,
    private refreshTokenHash?: string,
  ) {
    super(id, email);
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  async setPasswordHash(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    if (password === '' || password.length < 5 || password.length > 50)
      throw new InternalServerErrorException('Cannot set password');

    this.passwordHash = await bcrypt.hash(password, salt);
    this.updatedAt = new Date();
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash);
  }

  getRefreshTokenHash(): string | null | undefined {
    return this.refreshTokenHash;
  }

  async setRefreshTokenHash(refreshToken: string | null): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.refreshTokenHash = refreshToken ? await bcrypt.hash(refreshToken, salt) : null;
    this.updatedAt = new Date();

    this.apply(new UserUpdatedRefreshTokenEvent(this.id, this.refreshTokenHash));
  }

  async compareRefreshToken(refreshToken: string): Promise<boolean> {
    return await bcrypt.compare(refreshToken, this.refreshTokenHash);
  }

  getRegisteredAt(): Date {
    return this.registeredAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  mapToUser(): User {
    return new User(this.id, this.email);
  }
}
