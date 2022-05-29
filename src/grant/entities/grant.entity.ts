import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Action, Resource, Role } from 'common/enums';
import { BaseEntity } from 'common/entity';
import { Type } from 'class-transformer';
import { AccessAbility } from 'abacl';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Time {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @Prop({ required: true, type: String })
  cron_exp: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  @Prop({ required: true, type: Number })
  duration: number;

  constructor(time: Partial<Time>) {
    Object.assign(this, time);
  }
}

@Schema()
@ObjectType({ implements: BaseEntity })
export class Grant extends BaseEntity implements AccessAbility {
  @IsNotEmpty()
  @IsEnum(Role)
  @Field(() => Role)
  @Prop({ required: true, type: String, enum: Role })
  role: Role;

  @IsNotEmpty()
  @IsEnum(Action)
  @Field(() => Action)
  @Prop({ required: true, type: String, enum: Action })
  action: Action;

  @IsNotEmpty()
  @IsEnum(Resource)
  @Field(() => Resource)
  @Prop({ required: true, type: String, enum: Resource })
  object: Resource;

  @Type(() => String)
  @Field(() => [String])
  @IsArray({ each: true })
  @Prop({ required: false, type: [String] })
  field?: string[];

  @Type(() => String)
  @Field(() => [String])
  @IsArray({ each: true })
  @Prop({ required: false, type: [String] })
  filter?: string[];

  @Type(() => String)
  @Field(() => [String])
  @IsArray({ each: true })
  @Prop({ required: false, type: [String] })
  location?: string[];

  @Type(() => Time)
  @IsArray({ each: true })
  @Prop({ required: false, type: Time, eachPath: Time })
  @Field(() => [Time], { nullable: true })
  time?: Time[];

  constructor(grant: Partial<Grant>) {
    super(grant);
    Object.assign(this, grant);
  }
}

export type GrantDocument = Grant & Document;
export const GrantSchema = SchemaFactory.createForClass(Grant);
