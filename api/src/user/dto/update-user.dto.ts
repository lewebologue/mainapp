import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email?: string;
  name?: string;
  Role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
  password?: string;
}
