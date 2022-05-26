import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Filter } from 'common/decorators/graphql.filter.decorator';
import { GraphQLFilter } from 'common/scalars/filter.scalar';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ID } from 'graphql-ws';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Int, { name: 'countUser' })
  public async count(@Filter() filter: any) {
    return this.userService.count(filter);
  }

  @Mutation(() => User, { name: 'createUser' })
  public async create(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Query(() => [User], { name: 'users' })
  public async find(
    @Args('filter', { type: () => GraphQLFilter }) filter: any,
  ) {
    return this.userService.find(filter);
  }

  @Query(() => User, { name: 'user' })
  public async findOne(@Args('id') id: ID) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  public async update(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto._id, updateUserDto);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  public async delete(@Args('id') id: ID) {
    return this.userService.delete(id);
  }

  @Mutation(() => User, { name: 'restoreUser' })
  public async restore(@Args('id') id: ID) {
    return this.userService.restore(id);
  }
}
