import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const password: string = String(data.password);
    data.password = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
    });
  }

  async find(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findByEmailOrName(identifier: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { name: identifier }],
      },
    });
    return user;
  }
}
