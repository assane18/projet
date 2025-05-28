import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity'; // ← Assure-toi que ça pointe vers le bon fichier
import { UserRepository } from './user.repository'; // si tu as un custom repo

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ← C’est ça qui enregistre le UserRepository
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
