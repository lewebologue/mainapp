import { Injectable } from '@nestjs/common';
import {Cake, Order, Prisma} from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({
      data,
    });
  }

  async findAllOrder(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<Order> {
    const { where, data } = params;
    return this.prisma.order.update({
      data,
      where,
    });
  }

  async deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order> {
    return this.prisma.order.delete({
      where,
    });
  }

  async findOneOrder(
    CakeWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: CakeWhereUniqueInput,
    });
  }
}
