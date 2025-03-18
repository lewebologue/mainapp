import { Customer, Cake } from '@prisma/client';

export class CreateOrderDto {
  customer: Customer;
  cakes: Cake[];
  total: number;
  Withdrawal_date: Date;
  Delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}
