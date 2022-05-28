import { Grant } from 'grant/entities/grant.entity';
import { AccessAbility } from 'abacl';

export function getPlainGrant(grants: Grant[]): AccessAbility[] {
  return grants.map((grant) => ({
    role: grant.role,
    action: grant.action,
    object: grant.object,
    field: grant.field,
    filter: grant.filter,
    location: grant.location,
    time: grant.time?.map((time) => ({
      cron_exp: time.cron_exp,
      duration: time.duration,
    })),
  }));
}
