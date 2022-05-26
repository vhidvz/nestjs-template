import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Filter } from 'common/decorators/kafka-filter.decorator';

@Controller()
export class UserMicroservice {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('countUser')
  count(@Filter() filter: any) {
    return this.userService.count(filter);
  }

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findUser')
  find(@Filter() filter: any) {
    return this.userService.find(filter);
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto._id, updateUserDto);
  }

  @MessagePattern('deleteUser')
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern('restoreUser')
  restore(@Payload() id: string) {
    return this.userService.restore(id);
  }
}
