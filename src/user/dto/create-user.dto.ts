import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Profile, User } from 'user/entities/user.entity';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Exclude, Type } from 'class-transformer';
import mongoose from 'mongoose';

@InputType()
export class CreateProfileDto implements Profile {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @Prop({ required: true, type: String })
  name: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String, validator: [IsEmail] })
  email?: string;

  @IsMobilePhone('fa-IR')
  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String, validator: [IsMobilePhone('fa-IR')] })
  phone?: string;
}

@InputType()
export class CreateUserDto implements Omit<User, 'roles' | 'createdBy'> {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  @Field(() => ID, { nullable: true })
  public _id?: string | ObjectId;

  @Prop({ required: false, type: [String] })
  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Prop({ required: false, type: [String] })
  @Field(() => [String], { nullable: true })
  public groups?: string[];

  @Prop({ required: false, type: [String] })
  @Field(() => [String], { nullable: true })
  public partners?: string[];

  @IsNotEmpty()
  @Type(() => CreateProfileDto)
  @Field(() => CreateProfileDto)
  @Prop({ required: true, type: CreateProfileDto })
  public profile: CreateProfileDto;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @Prop({ required: true, type: String })
  public username: string;

  @Exclude()
  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String })
  public password?: string;
}
