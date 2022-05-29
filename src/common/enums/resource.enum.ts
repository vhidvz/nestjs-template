import { registerEnumType } from '@nestjs/graphql';

export enum Resource {
  All = 'all',

  Users = 'users',
  Grants = 'grants',
}

registerEnumType(Resource, {
  name: 'Resource',
});
