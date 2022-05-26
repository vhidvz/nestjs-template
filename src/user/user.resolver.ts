import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Filter } from 'common/decorators/graphql.filter.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  public async create(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Query('users')
  public async find(@Filter() filter: any) {
    return this.userService.find(filter);
  }

  @Query('user')
  public async findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  public async update(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto._id, updateUserDto);
  }

  @Mutation('deleteUser')
  public async delete(@Args('id') id: string) {
    return this.userService.delete(id);
  }

  @Mutation('restoreUser')
  public async restore(@Args('id') id: string) {
    return this.userService.restore(id);
  }
}
