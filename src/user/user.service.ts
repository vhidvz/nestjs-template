import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword } from 'common/helpers/argon2.helper';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async count(filter?: any): Promise<number> {
    return await this.userRepository.count(filter);
  }

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    if (!createUserDto.profile.email && !createUserDto.profile.phone)
      throw new HttpException(
        'profile with one of the email or phone property is required',
        HttpStatus.BAD_REQUEST,
      );

    if (createUserDto.password)
      createUserDto.password = await hashPassword(createUserDto.password);

    return await this.userRepository.create(createUserDto);
  }

  public async find(filter?: any): Promise<UserDocument[]> {
    return await this.userRepository.find(filter);
  }

  public async findOne(
    filter: FilterQuery<UserDocument>,
    projection?: ProjectionType<UserDocument>,
    options?: QueryOptions<UserDocument>,
  ): Promise<UserDocument> {
    return await this.userRepository.findOne(filter, projection, options);
  }

  public async findById(id: string, projection?: any): Promise<UserDocument> {
    return await this.userRepository.findById(id, projection);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userRepository.update(id, updateUserDto);
  }

  public async delete(id: string): Promise<UserDocument> {
    return await this.userRepository.delete(id);
  }

  public async restore(id: string): Promise<UserDocument> {
    return await this.userRepository.restore(id);
  }

  public async destroy(id: string): Promise<UserDocument> {
    return await this.userRepository.destroy(id);
  }
}
