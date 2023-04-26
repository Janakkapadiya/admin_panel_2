import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/domain/enums/Roles.enum';

@Injectable()
export class roleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredrole = this.reflector.getAllAndOverride<Role[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('REQUIRED', requiredrole);

    if (!requiredrole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('GUARD', user);
    return requiredrole.some((role) => user.role == role);
  }
}
