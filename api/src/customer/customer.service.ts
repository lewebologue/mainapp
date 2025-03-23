import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Customer, Prisma } from '@prisma/client';
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CustomerCreateInput) {
    return this.prisma.customer.create({
      data,
    });
  }

  update(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.customer.update({
      where,
      data,
    });
  }

  async findOne(
    customerUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: customerUniqueInput,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
