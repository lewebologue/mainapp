import { User } from './user.interface';

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}
