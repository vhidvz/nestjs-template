import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Filter } from 'common/decorators/graphql-filter.decorator';
import { GraphQLFilter } from 'common/scalars/filter.scalar';
import { CreateGrantDto } from './dto/create-grant.dto';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { Grant } from './entities/grant.entity';
import { GrantService } from './grant.service';
import { ID } from 'graphql-ws';

@Resolver('Grant')
export class GrantResolver {
  constructor(private readonly grantService: GrantService) {}

  @Query(() => Int, { name: 'countGrant' })
  public async count(@Filter() filter: any): Promise<number> {
    return await this.grantService.count(filter);
  }

  @Mutation(() => Grant, { name: 'createGrant' })
  public async create(
    @Args('createGrantDto') createGrantDto: CreateGrantDto,
  ): Promise<Grant> {
    return await this.grantService.create(createGrantDto);
  }

  @Query(() => [Grant], { name: 'findGrant' })
  public async find(
    @Args('filter', { type: () => GraphQLFilter }) filter: any,
  ): Promise<Grant[]> {
    return await this.grantService.find(filter);
  }

  @Query(() => Grant, { name: 'findGrantById' })
  public async findById(@Args('id') id: ID): Promise<Grant> {
    return await this.grantService.findById(id);
  }

  @Mutation(() => Grant, { name: 'updateGrant' })
  public async update(
    @Args('updateGrantDto') updateGrantDto: UpdateGrantDto,
  ): Promise<Grant> {
    return await this.grantService.update(updateGrantDto._id, updateGrantDto);
  }

  @Mutation(() => Grant, { name: 'deleteGrant' })
  public async delete(@Args('id') id: ID): Promise<Grant> {
    return await this.grantService.delete(id);
  }

  @Mutation(() => Grant, { name: 'restoreGrant' })
  public async restore(@Args('id') id: ID): Promise<Grant> {
    return await this.grantService.restore(id);
  }
}
