import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user/user.entity';
import { UserPrivateEntityRepository } from '../db/user-private/user-private-entity.repository';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userEntityRepo: UserPrivateEntityRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userEntityRepo.findOneById(payload.sub);

    if (!user) throw new UnauthorizedException();
    return user.mapToUser();
  }
}
