import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

interface AuthenticatedUser {
  id: number;
  name?: string;
  email?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() signInInput: { email: string; password: string }) {
    return this.authService.login(signInInput);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: { user: AuthenticatedUser }) {
    console.log('req.user dentro do controller:', req.user); // 🔹 debug
    return req.user;
  }
}
