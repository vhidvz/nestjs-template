import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  _id: string;
}
