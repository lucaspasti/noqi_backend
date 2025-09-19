import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

type SignInInput = {
  email: string;
  password: string;
};

type AuthJwtPayload = {
  sub: number;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('User Not Found');

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched)
      throw new UnauthorizedException('Invalid Credentials!');

    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(signInInput: SignInInput) {
    const user = await this.validateLocalUser(signInInput);
    const { accessToken } = await this.generateToken(user.id);
    return {
      id: user.id,
      name: user.name,
      accessToken,
    };
  }

  async validateJwtUser(userId: number) {
    console.log('Validando usuário com ID:', userId); // 🔹 debug
    if (!userId) throw new UnauthorizedException('User ID não fornecido');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error('Usuário não encontrado no DB'); // 🔹 debug
      throw new UnauthorizedException('User not found!');
    }

    console.log('Usuário encontrado no DB:', user); // 🔹 debug
    return { id: user.id, name: user.name, email: user.email };
  }
}
