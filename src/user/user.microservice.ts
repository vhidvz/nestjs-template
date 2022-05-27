import { Filter } from 'common/decorators/kafka-filter.decorator';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';

@Controller()
export class UserMicroservice {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('countUser')
  public async count(@Filter() filter: any): Promise<number> {
    return this.userService.count(filter);
  }

  @MessagePattern('createUser')
  public async create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findUser')
  public async find(@Filter() filter: any): Promise<User[]> {
    return this.userService.find(filter);
  }

  @MessagePattern('findUserById')
  public async findById(@Payload() id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @MessagePattern('updateUser')
  public async update(@Payload() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(updateUserDto._id, updateUserDto);
  }

  @MessagePattern('deleteUser')
  public async delete(@Payload() id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @MessagePattern('restoreUser')
  public async restore(@Payload() id: string): Promise<User> {
    return this.userService.restore(id);
  }
}
