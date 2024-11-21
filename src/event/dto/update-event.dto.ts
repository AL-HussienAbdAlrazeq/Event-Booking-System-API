import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsString()
  title?: string;
  @IsString()
  description?: string;
  @IsString()
  location?: string;
  @IsDateString()
  date?: Date;
  @IsNumber()
  ticketPrice?: number;
}
