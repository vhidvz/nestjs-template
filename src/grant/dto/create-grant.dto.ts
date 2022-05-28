import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Grant, Time } from 'grant/entities/grant.entity';
import { Type } from 'class-transformer';

@InputType()
export class CreateTimeDto implements Time {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  cron_exp: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  duration: number;
}

@InputType()
export class CreateGrantDto implements Grant {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  public createdBy: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  role: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  action: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  object: string;

  @Type(() => String)
  @Field(() => [String])
  @IsArray({ each: true })
  field?: string[];

  @Type(() => String)
  @Field(() => [String])
  @IsArray({ each: true })
  filter?: string[];

  @Type(() => String)
  @Field(() => [String])
  @IsArray({ each: true })
  location?: string[];

  @IsArray({ each: true })
  @Type(() => CreateTimeDto)
  @Field(() => [CreateTimeDto], { nullable: true })
  time?: CreateTimeDto[];
}
