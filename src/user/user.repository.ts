import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  count(filter?: any) {
    return `This action returns all user`;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  find(filter?: any): any[] {
    return [`This action returns all user`];
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  delete(id: string) {
    return `This action removes a #${id} user`;
  }

  restore(id: string) {
    return `This action restores a #${id} user`;
  }

  destroy(id: string) {
    return `This action destroys a #${id} user`;
  }
}
