import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from '../users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('FRONTEND_KEY'), // environment variable
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const access_token = request?.cookies['ACCESS_TOKEN_COOKIE'];
          if (!access_token) {
            return null;
          }
          return access_token;
        },
      ]),
    });
  }

  async validate(payload: any): Promise<User> {
    return {
      currentHashedRefreshToken: '',
      accesses: [],
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      phonenumber: '',
      finger: undefined,
      role: UserRole.USER,
      uuid: payload.sub,
      username: payload.username,
    };
  }
}
