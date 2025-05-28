import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TwilioService } from '../2fa/twilio.service';
import { UsersService } from '../users/users.service';

const otpStore = new Map<string, string>(); // email -> otp

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private twilioService: TwilioService
  ) {}

  private formatPhone(phone: string): string {
    return phone.startsWith('+') ? phone : `+33${phone.slice(1)}`;
  }

  async register(email: string, password: string, phone: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ email, password: hashed, phone });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);
    console.log('📨 OTP envoyé (inscription) :', otp);

    const formattedPhone = this.formatPhone(phone);
    await this.twilioService.sendSMS(
      formattedPhone,
      `Votre code de vérification est : ${otp}`
    );

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(email, otp);
      console.log('📨 OTP envoyé (connexion) :', otp);

      const formattedPhone = this.formatPhone(user.phone);
      await this.twilioService.sendSMS(
        formattedPhone,
        `Connexion détectée. Code : ${otp}`
      );

      const payload = { sub: user.id, email: user.email };
      return { access_token: this.jwtService.sign(payload) };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  verifyOtp(email: string, otp: string): boolean {
    const stored = otpStore.get(email);
    const isValid = stored === otp;
    if (isValid) otpStore.delete(email);
    return isValid;
  }

  async resendOtp(email: string): Promise<boolean> {
  const user = await this.usersService.findByEmail(email);
  if (!user) return false;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);
  console.log('🔁 OTP renvoyé :', otp);

  const formattedPhone = this.formatPhone(user.phone);
  await this.twilioService.sendSMS(formattedPhone, `Votre nouveau code est : ${otp}`);

  return true;
}


  async getProfile(user: any) {
    return this.usersService.findById(user.userId);
  }
}
