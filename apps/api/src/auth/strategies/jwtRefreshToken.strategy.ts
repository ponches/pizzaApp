import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/entities/user/user.entity';
import { UserPrivateEntityRepository } from '../db/user-private/user-private-entity.repository';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly userPrivateRepo: UserPrivateEntityRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<User> {
    const userPrivate = await this.userPrivateRepo.findOneById(payload.sub);
    if (!userPrivate) throw new UnauthorizedException();

    const refreshToken = req.body.refreshToken.trim();
    const refreshTokensMatch = await userPrivate.compareRefreshToken(refreshToken);

    if (!refreshTokensMatch) throw new UnauthorizedException();

    return userPrivate.mapToUser();
  }
}
