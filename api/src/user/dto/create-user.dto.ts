import { Role } from '@prisma/client';

export class CreateUserDto {
  email: string;
  name: string;
  Role: Role;
  createdAt: Date;
  updatedAt: Date;
}
