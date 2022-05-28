import { SetMetadata } from '@nestjs/common';

export const SCOPES_KEY = 'scopes';
export const Scopes = (...roles: string[]) => SetMetadata(SCOPES_KEY, roles);
