export class RefreshAccessTokenCommand {
  constructor(public readonly userId: string, public readonly refreshToken: string) {}
}
