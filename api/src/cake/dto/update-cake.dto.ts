import { PartialType } from '@nestjs/mapped-types';
import { CreateCakeDto } from './create-cake.dto';

export class UpdateCakeDto extends PartialType(CreateCakeDto) {
  name?: string;
  price?: number;
  created_at?: Date;
  updated_at?: Date;
}
