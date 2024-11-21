import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   const requireRole = this.reflector.getAllAndOverride<Role[]>('role',[
    context.getHandler(),
    context.getClass()
   ])
   if(!requireRole) return true
   const{user} = context.switchToHttp().getRequest() 
   return requireRole.some((role) => user.roles.includes(role));
  }
}
