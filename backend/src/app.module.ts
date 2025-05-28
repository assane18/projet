import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity'; 
//import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // ou localhost si en local sans docker
      port: 5432,
      username: 'root',
      password: 'G3bB4EnaRg@PcBme5f7qgiXGdJc',
      database: 'emaildb',
      entities: [User],
      synchronize: true, // <--- doit être true pour générer la table automatiquement
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
