import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  lastname?: string;
  firstname?: string;
  email?: string;
  phone?: string;
  address?: string;
  orders?: { id: string }[];
  createdAt?: Date;
  updatedAt?: Date;
}
