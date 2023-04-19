import { AdminM } from '../model/AdminM';

export interface AdminRepository {
  createUserByAdmin(user: AdminM): Promise<AdminM>;
}
