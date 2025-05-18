import { Controller, Post, Body, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

interface AuthCredentials {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: AuthCredentials) {
    const user = await this.authService.validateUser(credentials.email, credentials.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() credentials: AuthCredentials) {
    return this.authService.register(credentials.email, credentials.password);
  }

  @Post('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Request() req) {
    return req.user;
  }
}
