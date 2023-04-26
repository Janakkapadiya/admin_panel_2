import { UserM } from '../model/UserM';

export interface UserRepository {
  register(user: UserM): Promise<UserM>;
  createUser(user: UserM): Promise<UserM>;
  getById(id: number): Promise<UserM>;
  getByEmail(username: string): Promise<UserM>;
  getAll(): Promise<UserM[]>;
}
