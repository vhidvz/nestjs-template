import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Profile {
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
  profile: Profile;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @Prop({ required: true, type: String })
  username: string;

  @Exclude()
  @Field(() => String, { nullable: true })
  @Prop({ required: false, type: String })
  password?: string;

  @Exclude()
  @Field(() => [String])
  @Prop({ required: true, type: [String] })
  roles: string[];

  constructor(user?: Partial<User>) {
    super(user);
    if (user) Object.assign(this, user);
  }
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
