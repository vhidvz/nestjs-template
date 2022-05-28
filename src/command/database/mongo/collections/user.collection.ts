import { User } from 'user/entities/user.entity';
import { ObjectId } from 'mongodb';

export const user: User[] = [
  {
    /** password: aDm!N...@123 */
    _id: new ObjectId('5f2c0a54e938a666e2e68bea'),
    username: 'sysadmin',
    password: '$2b$10$yG4q4yQU7LZEAF1ao44jlejh5RAwKbHdbIjJFaTcMbIXxMBEv8NLO',
    profile: {
      name: 'system',
    },
    roles: ['system'],
    createdBy: 'system',
    createdAt: new Date(),
  },
];
