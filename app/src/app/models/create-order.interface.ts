import { PaymentMethod } from './paymentMethods.enum';

export interface CreateOrder {
  customerId: string;
  cakeIds: string[];
  total: number;
  Withdrawal_date: Date;
  PaymentMethod: PaymentMethod;
  deposit?: number;
  remaining_balance?: number;
}
