import { AdminM } from '../model/AdminM';
import { UserM } from '../model/UserM';

export interface AdminRepository {
  createUserByAdmin(user: AdminM): Promise<UserM>;
}
