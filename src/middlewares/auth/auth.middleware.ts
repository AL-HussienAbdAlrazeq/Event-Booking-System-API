import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
  ){}
  async use(req: any, res: any, next: () => void) {
    const {token} = req.headers
    if(!token) {
      throw new BadRequestException("Token not Provided")
    }
    const decode:any = verify(token , process.env.SECRET_KEY)

    req['user'] = {
      username:decode.username,
      userId:decode.userId,
      roles:[decode.role]
    }
    // req['userId'] = decode
    // req['role'] = decode

    if(!decode){
      throw new UnauthorizedException('UnAuthorized')
    }
    next();
  }
}
