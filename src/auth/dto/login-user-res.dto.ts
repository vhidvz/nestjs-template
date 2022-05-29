import { IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserResDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  public accessToken: string;
}
