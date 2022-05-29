import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Grant, Time } from 'grant/entities/grant.entity';
import { Type } from 'class-transformer';
import { Role } from 'common/enums/role.enum';
import { Action, Resource } from 'common/enums';

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

  @IsNotEmpty()
  @IsEnum(Role)
  @Field(() => Role)
  role: Role;

  @IsNotEmpty()
  @IsEnum(Action)
  @Field(() => Action)
  action: Action;

  @IsNotEmpty()
  @IsEnum(Resource)
  @Field(() => Resource)
  object: Resource;

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
