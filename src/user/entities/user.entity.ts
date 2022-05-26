import { Entity } from 'common/entity';

export class Profile {
  name: string;
  email?: string;
  phone?: string;

  constructor(profile: Partial<Profile>) {
    Object.assign(this, profile);
  }
}

export class User extends Entity {
  profile: Profile;

  username: string;
  password?: string;

  roles: string[];

  constructor(user?: Partial<User>) {
    super(user);
    if (user) Object.assign(this, user);
  }
}
