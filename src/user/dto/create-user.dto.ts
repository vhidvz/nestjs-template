import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Profile, User } from 'user/entities/user.entity';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Exclude, Type } from 'class-transformer';
import { ObjectId } from 'bson';

@InputType()
export class CreateProfileDto implements Profile {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsMobilePhone('fa-IR')
  @Field(() => String, { nullable: true })
  phone?: string;
}

@InputType()
export class CreateUserDto implements Omit<User, 'roles' | 'createdBy'> {
  @Field(() => ID, { nullable: true })
  public _id?: string | ObjectId;

  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Field(() => [String], { nullable: true })
  public groups?: string[];

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

  @Exclude()
  @Field(() => String, { nullable: true })
  public password?: string;
}
