import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createEvent({
    title,
    location,
    description,
    date,
    ticketPrice,
    userId,
  }: CreateEventDto) {
    const organizer = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!organizer) throw new NotFoundException('Organizer not found');
    const event = this.eventRepository.create({
      title,
      location,
      description,
      date,
      ticketPrice,
      organizer,
    });
    return await this.eventRepository.save(event);
  }

  async getAllEvents() {
    return await this.eventRepository.find();
  }

  async getEventById(id: number) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event Not Found');
    }
    return event;
  }

  async updateEvent(
    id: number,
    userId: number,
    { title, description, location, date, ticketPrice }: UpdateEventDto,
  ) {
    const organizer = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!organizer) throw new NotFoundException('Organizer not found');
    const event = await this.eventRepository.findOne({ where: { id } });
    if (event.organizer?.id !== userId) {
      if (!organizer || organizer.role !== 'admin'&&'organizer') {
        throw new ForbiddenException('You do not have permission to update this event');
      }
    }
    if(!event){
      throw new NotFoundException("Event Not Found")
    }
    event.title = title;
    event.description = description;
    event.location = location;
    event.date = date;  
    event.ticketPrice = ticketPrice;
    return this.eventRepository.save(event);
  }

  deleteEvent(id: number) {
    return `This action removes a #${id} event`;
  }
}
