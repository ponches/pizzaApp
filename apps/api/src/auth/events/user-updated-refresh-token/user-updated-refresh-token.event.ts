export class UserUpdatedRefreshTokenEvent {
  constructor(public readonly userId: string, public readonly refreshTokenHash: string | null) {}
}
