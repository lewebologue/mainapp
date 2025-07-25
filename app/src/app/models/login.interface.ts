import { Role } from './roles.enum';
import { User } from './user.interface';

export interface LoginResponse {
  access_token: string;
  user: User;
  role: Role;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}
