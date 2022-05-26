import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Filter } from 'common/decorators/socket-filter.decorator';

@WebSocketGateway()
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('findAllUser')
  count(@Filter() filter: any) {
    return this.userService.count(filter);
  }

  @SubscribeMessage('createUser')
  create(@MessageBody() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SubscribeMessage('findAllUser')
  find(@Filter() filter: any) {
    return this.userService.find(filter);
  }

  @SubscribeMessage('findOneUser')
  findOne(@MessageBody() id: string) {
    return this.userService.findOne(id);
  }

  @SubscribeMessage('updateUser')
  update(@MessageBody() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto._id, updateUserDto);
  }

  @SubscribeMessage('deleteUser')
  delete(@MessageBody() id: string) {
    return this.userService.delete(id);
  }

  @SubscribeMessage('restoreUser')
  restore(@MessageBody() id: string) {
    return this.userService.restore(id);
  }
}
