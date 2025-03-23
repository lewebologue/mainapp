export class CreateCustomerDto {
  lastname: string;
  firstname: string;
  email?: string;
  phone?: string;
  address?: string;
  orders?: { id: string }[];
  createdAt: Date;
  updatedAt: Date;
}
