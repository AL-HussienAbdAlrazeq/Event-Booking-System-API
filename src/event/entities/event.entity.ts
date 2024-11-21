import { Booking } from 'src/booking/entities/booking.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  location: string;

  @Column()
  date: Date;

  // @Column()
  // availableSeats: number;

  @Column('decimal')
  ticketPrice: number;

  @ManyToOne(() => User, (user) => user.events)
  organizer: User;
  @OneToMany(()=>Booking , (booking)=>booking.events)
  bookings:Booking

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
