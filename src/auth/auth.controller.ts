import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'user/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'common/decorators/restful-user.decorator';
import { LoginUserResDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<User> {
    return await this.authService.register(registerUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(
    @CurrentUser() user: Omit<User, 'password'>,
  ): Promise<LoginUserResDto> {
    return await this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
