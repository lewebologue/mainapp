export class CreateCustomerDto {
  lastname: string;
  firstname: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}
