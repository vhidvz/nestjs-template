import { Filter } from 'common/decorators/kafka-filter.decorator';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
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
  public async create(@Payload() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findUser')
  public async find(@Filter() filter: any): Promise<UserDocument[]> {
    return this.userService.find(filter);
  }

  @MessagePattern('findOneUser')
  public async findOne(@Payload() id: string): Promise<UserDocument> {
    return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  public async update(@Payload() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userService.update(updateUserDto._id, updateUserDto);
  }

  @MessagePattern('deleteUser')
  public async delete(@Payload() id: string): Promise<UserDocument> {
    return this.userService.delete(id);
  }

  @MessagePattern('restoreUser')
  public async restore(@Payload() id: string): Promise<UserDocument> {
    return this.userService.restore(id);
  }
}
