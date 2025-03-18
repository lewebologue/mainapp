import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { Cake } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  id: string;
  customerId: string;
  cakes: Cake[];
  total: number;
  Withdrawal_date: Date;
  Delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}
