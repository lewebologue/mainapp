import { PaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  customerId?: string;
  customer?: { connect: { id: string } };
  cakeIds?: string[];
  cakes?: { id: string }[];
  total: number;
  Withdrawal_date: Date;
  PaymentMethod: PaymentMethod;
  deposit?: number;
  remaining_balance?: number;
  delivered?: boolean;
}
