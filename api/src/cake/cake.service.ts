import { Injectable } from '@nestjs/common';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';

@Injectable()
export class CakeService {
  create(createCakeDto: CreateCakeDto) {
    return 'This action adds a new cake';
  }

  findAll() {
    return `This action returns all cake`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cake`;
  }

  update(id: number, updateCakeDto: UpdateCakeDto) {
    return `This action updates a #${id} cake`;
  }

  remove(id: number) {
    return `This action removes a #${id} cake`;
  }
}
