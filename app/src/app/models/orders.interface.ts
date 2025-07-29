import { PaymentMethod } from './paymentMethods.enum';
import { Customers } from './customers.interface';
import { Cakes } from './cakes.interface';

export interface Orders {
  id: string;
  customer: Customers;
  cakes: Cakes[];
  total: number;
  Withdrawal_date: Date;
  PaymentMethod: PaymentMethod;
  deposit?: number;
  remaining_balance?: number;
  delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}
