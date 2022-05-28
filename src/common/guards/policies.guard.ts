import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { POLICIES_KEY } from 'common/constants/policies.constants';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPolicies = this.reflector.getAllAndOverride<string[]>(
      POLICIES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPolicies) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredPolicies.some((role) => user.roles?.includes(role));
  }
}
