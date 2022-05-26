import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async count(filter?: any) {
    return this.userRepository.count(filter);
  }

  public async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  public async find(filter?: any): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  public async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  public async delete(id: string) {
    return this.userRepository.delete(id);
  }

  public async restore(id: string) {
    return this.userRepository.restore(id);
  }

  public async destroy(id: string) {
    return this.userRepository.destroy(id);
  }
}
