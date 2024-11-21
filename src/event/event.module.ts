import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Event , User]) , JwtModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes(EventController)
  }
}
   