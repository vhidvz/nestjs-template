import { registerEnumType } from '@nestjs/graphql';

export enum Resource {
  all = 'all',

  User = 'User',
  Grant = 'Grant',
}

registerEnumType(Resource, {
  name: 'Resource',
});
