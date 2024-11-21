import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Event } from 'src/event/entities/event.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { Role } from '../roles/roles.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum:Role,
    default: Role.User,
  })
  role: string;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking;
}
