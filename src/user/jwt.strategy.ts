import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "./user.service";
import { jwtConstants } from "./jwtConstant";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // Use environment variable
    });
  }

  async validate(id: any) {
    // return this.userService.findOne(payload.userId);
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // 'userId' here refers to the user ID
  }
}