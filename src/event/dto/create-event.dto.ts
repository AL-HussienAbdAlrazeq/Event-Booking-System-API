import {  IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  location: string;
  @IsDateString()
  date: Date;
  @IsNumber()
  @IsNotEmpty()
  ticketPrice: number;
  @IsOptional()
  userId?:number
}
