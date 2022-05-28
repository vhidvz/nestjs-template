import { SetMetadata } from '@nestjs/common';

export const POLICIES_KEY = 'policies';
export const Policies = (...policies: string[]) =>
  SetMetadata(POLICIES_KEY, policies);
