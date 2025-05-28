import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // <-- Assure-toi que ce chemin est correct

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  private formatPhone(phone: string): string {
    if (phone.startsWith('0')) {
      return '+33' + phone.substring(1);
    }
    return phone;
  }

  async create(data: Partial<User>) {
    const user = this.userRepo.create({
      ...data,
      phone: data.phone ? this.formatPhone(data.phone) : undefined,
    });
    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }
}
