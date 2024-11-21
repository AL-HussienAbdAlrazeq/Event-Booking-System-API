import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RolesGuard } from 'src/user/roles/roles.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/roles/roles.interface';
import { AuthGuard } from 'src/user/Guard/Auth.Guard';
import { JwtAuthGuard } from 'src/user/Guard/jwt-auth.guard';

@Controller('event')
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class EventController {
  constructor(private  eventService: EventService) {}

  @Post('/create-event')
  @Roles(Role.Organizer,Role.Admin)
  createEvent(@Body() {title,location,description,date,ticketPrice , userId}: CreateEventDto) {
    return this.eventService.createEvent({title,location,description,date,ticketPrice,userId});
  }

  @Get('/get-all-events')
  @Roles(Role.Admin,Role.Organizer,Role.User)
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get('/get-event/:id')
  @Roles(Role.Admin,Role.Organizer,Role.User)
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(+id);
  }

  @Patch('/update-event/:id')
  @Roles(Role.Admin,Role.Organizer)
  updateEvent(@Param('id') id: string, @Body() {date,description,location,ticketPrice,title}: UpdateEventDto , @Req() req ) {
    const userId = req.user.userId
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
      throw new BadRequestException('Invalid event ID');
    }
    return this.eventService.updateEvent(eventId, userId,{date,ticketPrice,description,location,title});
  }

  @Delete(':id')
  @Roles(Role.Admin,Role.Organizer)
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(+id);
  }
}
