import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
@InputType()
export class RegisterProfileDto {
  @Expose()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @Expose()
  @IsMobilePhone('fa-IR')
  @Field(() => String, { nullable: true })
  phone?: string;
}

@Exclude()
@InputType()
export class RegisterUserDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => RegisterProfileDto)
  @Field(() => RegisterProfileDto)
  public profile: RegisterProfileDto;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  public username: string;

  @Expose()
  @IsString()
  @Field(() => String, { nullable: true })
  public password?: string;
}
