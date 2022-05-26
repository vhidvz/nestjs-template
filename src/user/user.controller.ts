import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Head,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Filter } from 'common/decorators/restful-filter.decorator';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async count(@Filter() filter: any) {
    return this.userService.count(filter);
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  public async find(@Filter() filter: any): Promise<User[]> {
    return this.userService.find(filter);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Head(':id')
  public async restore(@Param('id') id: string) {
    return this.userService.restore(id);
  }
}
