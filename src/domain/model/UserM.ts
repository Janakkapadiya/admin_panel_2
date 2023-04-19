export class UserWithoutPassword {
  id: number;
  email: string;
  name: string | null;
  role: any;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
