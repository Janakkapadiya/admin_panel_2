import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/domain/enums/Roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
