import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CakeService } from './cake.service';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';

@Controller('cake')
export class CakeController {
  constructor(private readonly cakeService: CakeService) {}

  @Post()
  create(@Body() createCakeDto: CreateCakeDto) {
    return this.cakeService.create(createCakeDto);
  }

  @Get()
  findAll() {
    return this.cakeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cakeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCakeDto: UpdateCakeDto) {
    return this.cakeService.update(+id, updateCakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cakeService.remove(+id);
  }
}
