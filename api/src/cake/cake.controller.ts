import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CakeService } from './cake.service';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';

@ApiTags('cake')
@Controller('cake')
export class CakeController {
  constructor(private readonly cakeService: CakeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cake' })
  @ApiResponse({
    status: 201,
    description: 'The cake has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createCakeDto: CreateCakeDto) {
    return this.cakeService.createCake(createCakeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cakes' })
  @ApiResponse({ status: 200, description: 'Return all cakes.' })
  findAll() {
    return this.cakeService.findAll({ orderBy: { name: 'asc' } });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cake by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the cake with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Cake not found.' })
  findOne(@Param('id') id: string) {
    return this.cakeService.findOneCake({ id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cake by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cake has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Cake not found.' })
  update(@Param('id') id: string, @Body() updateCakeDto: UpdateCakeDto) {
    return this.cakeService.updateCake({
      where: { id },
      data: updateCakeDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cake by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cake has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Cake not found.' })
  remove(@Param('id') id: string) {
    return this.cakeService.deleteCake({ id });
  }
}
