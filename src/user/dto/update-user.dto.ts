import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  public _id: string;
}
