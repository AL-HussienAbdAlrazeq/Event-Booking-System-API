import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signup({ username, email, password, role }: CreateUserDto) {
    const isExist = await this.userRepository.findOne({
      where: [{ email: email }, { username: username }],
    });
    if (isExist) {
      throw new ConflictException(
        'Email already exist or User name already used',
      );
    }
    const user = await this.userRepository.create({
      username,
      email,
      password,
      role,
    });
    user.hashPassword();
    return this.userRepository.save(user);
  }

  async signin(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Incorrect email or password');
    }

    const jwt = sign({userId:user.id ,username:user.username , role:user.role },process.env.SECRET_KEY)
    // const payload = {
    //   userId: user.id,
    //   username: user.username,
    //   email: user.email,
    //   role: user.role,
    // };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
    return {jwt , user}
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
