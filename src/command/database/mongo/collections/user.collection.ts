import { User } from 'user/entities/user.entity';
import { ObjectId } from 'mongodb';
import { Role } from 'common/enums/role.enum';

export const user: User[] = [
  {
    /** password: aDm!N...@123 */
    _id: new ObjectId('6292157072f600c87fe77724'),
    username: 'sysadmin',
    password: '$2b$10$yG4q4yQU7LZEAF1ao44jlejh5RAwKbHdbIjJFaTcMbIXxMBEv8NLO',
    profile: {
      name: 'system',
      email: 'sysadmin@admin.sys',
    },
    roles: [Role.System],
    createdBy: 'system',
  },
];
