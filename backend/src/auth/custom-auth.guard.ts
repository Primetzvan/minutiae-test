import { ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ExtractJwt } from "passport-jwt";
import { UsersService } from '../users/users.service';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(CustomAuthGuard.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super();
  }

  /*async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      const accessToken = ExtractJwt.fromExtractors([cookieExtractor])(request);
      if (!accessToken)
        throw new UnauthorizedException('Access token is not set');

      const isValidAccessToken = this.authService.validateToken(accessToken);
      if (isValidAccessToken) return this.activate(context);

      const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE];
      if (!refreshToken)
        throw new UnauthorizedException('Refresh token is not set');
      const isValidRefreshToken = this.authService.validateToken(refreshToken);
      if (!isValidRefreshToken)
        throw new UnauthorizedException('Refresh token is not valid');

      const user = await this.userService.getByRefreshToken(refreshToken);
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken, //nanoid(30); //=> "O0yrIIKLCOI5bPqCGAOJrTVCi3hz50"
      } = this.authService.createTokens(user.id);

      await this.userService.updateRefreshToken(user.id, newRefreshToken);

      request.cookies[ACCESS_TOKEN_COOKIE] = newAccessToken;
      request.cookies[REFRESH_TOKEN_COOKIE] = newRefreshToken;

      response.cookie(ACCESS_TOKEN_COOKIE, newAccessToken, COOKIE_OPTIONS);
      response.cookie(
        REFRESH_TOKEN_COOKIE,
        newRefreshToken,
        COOKIE_OPTIONS,
      );

      return this.activate(context);
    } catch (err) {
      this.logger.error(err.message);
      response.clearCookie(ACCESS_TOKEN_COOKIE, COOKIE_OPTIONS);
      response.clearCookie(REFRESH_TOKEN_COOKIE, COOKIE_OPTIONS);
      return false;
    }
  }*/

  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
