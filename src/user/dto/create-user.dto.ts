import { InputType } from '@nestjs/graphql';
import { User } from 'user/entities/user.entity';

@InputType()
export class CreateUserDto extends User {}
