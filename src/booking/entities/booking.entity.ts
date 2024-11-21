import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatsBooked: number;

  @Column('decimal')
  totalPrice: number;

  @ManyToOne(()=>User , (user)=>user.bookings)
  user:User
  @ManyToOne(()=>Event , (event)=>event.bookings)
  events:Event

  @CreateDateColumn()
  createdAt: Date;
}
