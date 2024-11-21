import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Booking } from './booking/entities/booking.entity';
import { ConfigModule } from '@nestjs/config';
import { Event } from './event/entities/event.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './user/roles/roles.guard';
import { JwtAuthGuard } from './user/Guard/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Booking, Event],
      synchronize: true,
    }),
    UserModule,
    BookingModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
