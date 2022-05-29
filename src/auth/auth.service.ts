import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'common/enums/role.enum';
import { verifyPassword } from 'common/helpers/argon2.helper';
import { User, UserDocument } from 'user/entities/user.entity';
import { UserService } from 'user/user.service';
import { LoginUserRepDto, LoginUserResDto, RegisterUserDto } from './dto';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser({
    username,
    password,
  }: LoginUserRepDto): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne({ username });

    if (user && verifyPassword(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject<User>();

      return result;
    }

    return null;
  }

  public async login(user: Omit<User, 'password'>): Promise<LoginUserResDto> {
    const payload: JwtPayload = {
      uid: user._id.toString(),
      roles: user.roles,
      username: user.username,
      profile: user.profile,
    };

    return {
      accessToken: this.jwtService.sign(payload),
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
