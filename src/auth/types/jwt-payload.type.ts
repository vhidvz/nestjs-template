import { Profile } from 'user/entities/user.entity';

export type JwtPayload = {
  readonly uid: string;
  readonly roles: string[];
  readonly username: string;
  readonly profile: Profile;
};
