import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Profile, User } from 'user/entities/user.entity';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Exclude, Type } from 'class-transformer';
import { ObjectId } from 'bson';
import { Role } from 'common/enums/role.enum';

@InputType()
export class CreateProfileDto implements Profile {
  @IsString()
  @Field(() => String)
  name?: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsMobilePhone('fa-IR')
  @Field(() => String, { nullable: true })
  phone?: string;
}

@InputType()
export class CreateUserDto implements User {
  @Field(() => ID, { nullable: true })
  public _id?: string | ObjectId;

  @IsArray()
  @IsString()
  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @IsArray()
  @IsString()
  @Field(() => [String], { nullable: true })
  public groups?: string[];

  @IsArray()
  @IsString()
  @Field(() => [String], { nullable: true })
  public partners?: string[];

  @IsNotEmpty()
  @Type(() => CreateProfileDto)
  @Field(() => CreateProfileDto)
  public profile: CreateProfileDto;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  public username: string;

  @IsArray()
  @IsEnum(Role)
  @Field(() => [Role], { nullable: true })
  public roles?: Role[];

  @Exclude()
  @Field(() => String, { nullable: true })
  public password?: string;

  @Exclude()
  @Field(() => String)
  public createdBy: string;
}
