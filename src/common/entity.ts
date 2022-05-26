import { Field, GraphQLISODateTime, ID, InterfaceType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import mongoose from 'mongoose';

@Schema()
@Exclude()
@InterfaceType()
export class BaseEntity {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  @ApiProperty({ type: String, readOnly: true, required: true, format: 'uuid' })
  @Field(() => ID, { nullable: true })
  public _id?: string;

  @Prop({ required: false, type: [String] })
  @ApiPropertyOptional({ type: [String] })
  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Prop({ required: false, type: [String] })
  @ApiPropertyOptional({ type: [String] })
  @Field(() => [String], { nullable: true })
  public groups?: string[];

  @Prop({ required: false, type: [String] })
  @ApiPropertyOptional({ type: [String] })
  @Field(() => [String], { nullable: true })
  public partners?: string[];

  @Prop({ required: true, type: Date })
  @ApiProperty({ type: Date, format: 'date-time' })
  @Field(() => GraphQLISODateTime)
  public createdAt: Date;

  @Prop({ required: true, type: String })
  @ApiProperty({ type: String, format: 'uuid' })
  @Field(() => String)
  public createdBy: string;

  @Prop({ required: false, type: Date })
  @ApiPropertyOptional({ type: Date, format: 'date-time' })
  @Field(() => GraphQLISODateTime, { nullable: true })
  public updatedAt?: Date;

  @Prop({ required: false, type: String })
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @Field(() => String, { nullable: true })
  public updatedBy?: string;

  @Prop({ required: false, type: Date })
  @ApiPropertyOptional({ type: Date, format: 'date-time' })
  @Field(() => GraphQLISODateTime, { nullable: true })
  public deletedAt?: Date;

  @Prop({ required: false, type: String })
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @Field(() => String, { nullable: true })
  public deletedBy?: string;

  @Prop({ required: false, type: Date })
  @ApiPropertyOptional({ type: Date, format: 'date-time' })
  @Field(() => GraphQLISODateTime, { nullable: true })
  public restoredAt?: Date;

  @Prop({ required: false, type: String })
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @Field(() => String, { nullable: true })
  public restoredBy?: string;

  constructor(entity?: Partial<BaseEntity>) {
    this.createdBy = entity?.createdBy ?? 'system';
    this.createdAt = entity?.createdAt ?? new Date();

    if (entity?.tags) this.tags = entity.tags;

    if (entity?.groups) this.groups = entity.groups;
    if (entity?.partners) this.partners = entity.partners;

    if (entity?.updatedAt) this.updatedAt = entity.updatedAt;
    if (entity?.updatedBy) this.updatedBy = entity.updatedBy;

    if (entity?.deletedAt) this.deletedAt = entity.deletedAt;
    if (entity?.deletedBy) this.deletedBy = entity.deletedBy;

    if (entity?.restoredAt) this.restoredAt = entity.restoredAt;
    if (entity?.restoredBy) this.restoredBy = entity.restoredBy;
  }
}
