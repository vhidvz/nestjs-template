import { Action, Resource, Role } from 'common/enums';
import { Grant } from 'grant/entities/grant.entity';

export const grant: Grant[] = [
  {
    role: Role.System,
    action: Action.Any,
    object: Resource.All,
    createdBy: Role.System,
  },
];
