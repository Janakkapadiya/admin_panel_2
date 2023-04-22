import { Role } from '../enums/Roles.enum';

export class UserWithoutPassword {
  id: number;
  email: string;
  name: string | null;
  role: Role;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
