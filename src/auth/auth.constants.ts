import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
  expiresIn: '60s',
  secret: '9S1BWRafeZhFClUvT44nxV5Hm4XEIHJi',
};
