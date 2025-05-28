// backend/src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
  const user = await this.authService.register(dto.email, dto.password, dto.phone);
  return { message: 'Utilisateur enregistré', user }; 
}

  @Post('login')
  login(@Body() body: { email: string, password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return this.authService.getProfile(req.user);
  }

  @Post('verify-otp')
verifyOtp(@Body() body: { email: string, otp: string }) {
  const isValid = this.authService.verifyOtp(body.email, body.otp);
  return { valid: isValid };
}

 @Post('resend-otp')
  async resendOtp(@Body() body: { email: string }) {
    const success = await this.authService.resendOtp(body.email);
    return { success };
  }

}