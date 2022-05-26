import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  username: string;

  @Field(() => GraphQLJSON)
  details: object;
}
