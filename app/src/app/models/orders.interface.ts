import { PaymentMethod } from './paymentMethods.enum';

export interface Orders {
  customer: string;
  cakes: string[];
  total: number;
  Withdrawal_date: Date;
  PaymentMethod: PaymentMethod;
  deposit: number;
  remaining_balance: number;
  Delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}
