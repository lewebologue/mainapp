export class CreateOrderDto {
  customer: { connect: { id: string } };
  cakes: { id: string }[];
  total: number;
  Withdrawal_date: Date;
  Delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}
