import { PaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  customer: { connect: { id: string } };
  cakes: { id: string }[];
  total: number;
  Withdrawal_date: Date;
  PaymentMethod: PaymentMethod;
  deposit: number;
  remaining_balance: number;
  Delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}
