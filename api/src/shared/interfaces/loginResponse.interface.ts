import { Role } from '@prisma/client';

export interface LoginResponse {
  access_token: string;
  user: string;
  role: Role;
}
