import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Filter } from 'common/decorators/socket-filter.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { UserService } from './user.service';

@WebSocketGateway()
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('countUser')
  public async count(@Filter() filter: any): Promise<number> {
    return await this.userService.count(filter);
  }

  @SubscribeMessage('createUser')
  public async create(@MessageBody() createUserDto: CreateUserDto): Promise<UserDocument> {
    return await this.userService.create(createUserDto);
  }

  @SubscribeMessage('findUser')
  public async find(@Filter() filter: any): Promise<UserDocument[]> {
    return await this.userService.find(filter);
  }

  @SubscribeMessage('findUserById')
  public async findById(@MessageBody() id: string): Promise<UserDocument> {
    return await this.userService.findById(id);
  }

  @SubscribeMessage('updateUser')
  public async update(@MessageBody() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return await this.userService.update(updateUserDto._id, updateUserDto);
  }

  @SubscribeMessage('deleteUser')
  public async delete(@MessageBody() id: string): Promise<UserDocument> {
    return await this.userService.delete(id);
  }

  @SubscribeMessage('restoreUser')
  public async restore(@MessageBody() id: string): Promise<UserDocument> {
    return await this.userService.restore(id);
  }
}
