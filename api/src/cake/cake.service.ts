import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Cake, Prisma } from '@prisma/client';

@Injectable()
export class CakeService {
  constructor(private prisma: PrismaService) {}

  async createCake(data: Prisma.CakeCreateInput): Promise<Cake> {
    return this.prisma.cake.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CakeWhereUniqueInput;
    where?: Prisma.CakeWhereInput;
    orderBy?: Prisma.CakeOrderByWithRelationInput;
  }): Promise<Cake[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cake.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateCake(params: {
    where: Prisma.CakeWhereUniqueInput;
    data: Prisma.CakeUpdateInput;
  }): Promise<Cake> {
    const { where, data } = params;
    return this.prisma.cake.update({
      data,
      where,
    });
  }

  async findOneCake(
    CakeWhereUniqueInput: Prisma.CakeWhereUniqueInput,
  ): Promise<Cake | null> {
    return this.prisma.cake.findUnique({
      where: CakeWhereUniqueInput,
    });
  }

  async deleteCake(where: Prisma.CakeWhereUniqueInput): Promise<Cake> {
    return this.prisma.cake.delete({
      where,
    });
  }
}
