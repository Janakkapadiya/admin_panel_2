import { User } from '@prisma/client';

export interface RequestWithUser {
  email: string;
  password: string;
  user: User;
}
