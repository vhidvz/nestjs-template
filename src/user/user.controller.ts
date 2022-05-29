import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Filter } from 'common/decorators/restful-filter.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async count(@Filter() filter: any): Promise<number> {
    return await this.userService.count(filter);
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  public async find(@Filter() filter: any): Promise<User[]> {
    return await this.userService.find(filter);
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }

  @Put(':id/restore')
  public async restore(@Param('id') id: string): Promise<User> {
    return await this.userService.restore(id);
  }
}
