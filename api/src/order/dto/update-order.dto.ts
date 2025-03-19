export class UpdateOrderDto {
  customer?: { connect: { id: string } };
  cakes?: { connect: { id: string }[] };
  total?: number;
  Withdrawal_date?: Date;
  delivered?: boolean;
}
