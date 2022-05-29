import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  User = 'user',
  Guest = 'guest',
  Admin = 'admin',
  System = 'system',
}

registerEnumType(Role, {
  name: 'Role',
});
