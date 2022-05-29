import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'common/enums/role.enum';
import { UserDocument } from 'user/entities/user.entity';
import { UserService } from 'user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(
    registerUserDto: RegisterUserDto,
  ): Promise<UserDocument> {
    return await this.userService.create({
      ...registerUserDto,
      roles: [Role.Guest],
      createdBy: Role.System,
    });
  }
}
