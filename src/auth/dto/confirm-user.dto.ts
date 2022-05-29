import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfirmUserDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  public code: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  public password: string;
}
