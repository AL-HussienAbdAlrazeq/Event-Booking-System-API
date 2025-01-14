import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../jwtConstant';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}
  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   const token = this.extractTokenFromHeader(request);
  //   if (!token) {
  //     throw new UnauthorizedException();
  //   }
  //   try {
  //     const payload = await this.jwtService.verifyAsync(token, {
  //       secret: jwtConstants.secret,
  //     });
  //     request['user'] = payload
      
  //   } catch {
  //     throw new UnauthorizedException()
  //   }
  //   return true
  // }
  // private extractTokenFromHeader(request:Request):string | undefined{
  //   const [type, token] = request.headers.authorization
  //   return type === 'Bearer' ? token : null;
  // }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {user} = context.switchToHttp().getRequest()
    return user.userId;
  }
}
