import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/domain/enums/Roles.enum';

export const role = (...role: Role[]) => SetMetadata('role', role);
