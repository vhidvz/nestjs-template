import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { BaseEntity } from 'common/entity';
import { Role } from 'common/enums/role.enum';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Profile {
  @IsString()
  @Field(() => String)
  @Prop({ required: true, type: String })
  name?: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String, validator: [IsEmail] })
  email?: string;

  @IsMobilePhone('fa-IR')
  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String, validator: [IsMobilePhone('fa-IR')] })
  phone?: string;

  constructor(profile: Partial<Profile>) {
    Object.assign(this, profile);
  }
}

@Schema()
@ObjectType({ implements: BaseEntity })
export class User extends BaseEntity {
  @IsNotEmpty()
  @Type(() => Profile)
  @Field(() => Profile)
  @Prop({ required: true, type: Profile })
  public profile: Profile;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @Prop({ required: true, type: String })
  public username: string;

  @Exclude()
  @ApiHideProperty()
  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String })
  public password?: string;

  @IsArray()
  @IsEnum(Role)
  @Field(() => [Role], { nullable: true })
  @Prop({ required: true, type: [String], enum: Role })
  public roles?: Role[];

  constructor(user: Partial<User>) {
    super(user);
    Object.assign(this, user);
  }
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
