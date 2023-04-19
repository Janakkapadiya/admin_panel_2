import { UserM } from '../model/UserM';

export interface UserRepository {
  create(user: UserM): Promise<UserM>;
  getById(id: number): Promise<UserM>;
  getByEmail(username: string): Promise<UserM>;
  getAll(): Promise<UserM[]>;
}
