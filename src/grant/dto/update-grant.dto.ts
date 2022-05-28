import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateGrantDto } from './create-grant.dto';

@InputType()
export class UpdateGrantDto extends CreateGrantDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  public _id: string;
}
