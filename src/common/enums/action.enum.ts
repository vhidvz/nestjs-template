import { registerEnumType } from '@nestjs/graphql';

export enum Action {
  Any = 'any',

  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Restore = 'restore',
  Destroy = 'destroy',

  CreateOwn = 'create:own',
  ReadOwn = 'read:own',
  UpdateOwn = 'update:own',
  DeleteOwn = 'delete:own',
  RestoreOwn = 'restore:own',
  DestroyOwn = 'destroy:own',

  CreateShared = 'create:shared',
  ReadShared = 'read:shared',
  UpdateShared = 'update:shared',
  DeleteShared = 'delete:shared',
  RestoreShared = 'restore:shared',
  DestroyShared = 'destroy:shared',

  CreateGroup = 'create:group',
  ReadGroup = 'read:group',
  UpdateGroup = 'update:group',
  DeleteGroup = 'delete:group',
  RestoreGroup = 'restore:group',
  DestroyGroup = 'destroy:group',
}

registerEnumType(Action, {
  name: 'Action',
});
