import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { RegisterDto } from './auth/dtos/register.dto';
import { LoginDto } from './auth/dtos/login.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  // Rota padrão
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Registrar novo usuário
  @Post('auth/register')
  async register(@Body() dto: RegisterDto) {
    // Passa o DTO diretamente para o AuthService
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  // Login de usuário
  @Post('auth/login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
