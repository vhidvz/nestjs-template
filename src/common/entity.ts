import { Field, GraphQLISODateTime, ID, InterfaceType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Exclude()
@InterfaceType()
export class Entity {
  @ApiProperty({ type: String, readOnly: true, required: true, format: 'uuid' })
  @Field(() => ID, { nullable: true })
  public _id?: string;

  @ApiPropertyOptional({ type: [String] })
  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @ApiPropertyOptional({ type: [String] })
  @Field(() => [String], { nullable: true })
  public groups?: string[];

  @ApiPropertyOptional({ type: [String] })
  @Field(() => [String], { nullable: true })
  public partners?: string[];

  @ApiProperty({ type: Date, format: 'date-time' })
  @Field(() => GraphQLISODateTime)
  public createdAt: Date;

  @ApiProperty({ type: String, format: 'uuid' })
  @Field(() => String)
  public createdBy: string;

  @ApiPropertyOptional({ type: Date, format: 'date-time' })
  @Field(() => GraphQLISODateTime, { nullable: true })
  public updatedAt?: Date;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @Field(() => String, { nullable: true })
  public updatedBy?: string;

  @ApiPropertyOptional({ type: Date, format: 'date-time' })
  @Field(() => GraphQLISODateTime, { nullable: true })
  public deletedAt?: Date;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @Field(() => String, { nullable: true })
  public deletedBy?: string;

  @ApiPropertyOptional({ type: Date, format: 'date-time' })
  @Field(() => GraphQLISODateTime, { nullable: true })
  public restoredAt?: Date;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @Field(() => String, { nullable: true })
  public restoredBy?: string;

  constructor(entity?: Partial<Entity>) {
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
