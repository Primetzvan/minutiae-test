import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('invalid jwt token');
    }
    const data = req?.cookies['REFRESH_COOKIE'];
    if (!data?.refresh_token) {
      throw new BadRequestException('invalid refresh token');
    }
    const user = await this.authService.validateRefreshToken(
      payload.username,
      data.refresh_token,
    );
    if (!user) {
      throw new BadRequestException('token expired');
    }

    return user;
  }
}
