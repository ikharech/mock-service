import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const AUTH_TOKEN_REFRESH_BEFORE = process.env
      .AUTH_TOKEN_REFRESH_BEFORE as string;
    const tokenLifetimeRemaining =
      (payload.exp as number) - Math.round(new Date().getTime() / 1000);
    if (
      tokenLifetimeRemaining <=
      parseInt(AUTH_TOKEN_REFRESH_BEFORE, 10) * 60
    ) {
      const { exp, iat, ...userinfo } = payload;
      const newToken = this.authService.generateJwtToken(userinfo);

      req.res.setHeader('jwt-token', newToken);
    }

    return true;
  }
}
