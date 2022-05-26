import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'common/entity';

@ObjectType()
export class Profile {
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

  constructor(profile: Partial<Profile>) {
    Object.assign(this, profile);
  }
}

@ObjectType({ implements: Entity })
export class User extends Entity {
  @IsNotEmpty()
  @Type(() => Profile)
  @Field(() => Profile)
  profile: Profile;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  username: string;

  @Exclude()
  @Field(() => String, { nullable: true })
  password?: string;

  @Exclude()
  @Field(() => [String])
  roles: string[];

  constructor(user?: Partial<User>) {
    super(user);
    if (user) Object.assign(this, user);
  }
}
