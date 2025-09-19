/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

type AuthJwtPayload = {
  sub: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthJwtPayload) {
    console.log('Payload recebido do JWT:', payload); // 🔹 debug
    if (!payload.sub) {
      console.error("Token inválido: 'sub' ausente");
      throw new UnauthorizedException('Token inválido');
    }
    const user = await this.authService.validateJwtUser(payload.sub);
    console.log('Usuário validado:', user); // 🔹 debug
    return user;
  }
}
