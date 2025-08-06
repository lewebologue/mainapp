import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Prisma } from '@prisma/client';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of customers' })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of records to skip',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of records to take',
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: String,
    description: 'Cursor for pagination',
  })
  @ApiQuery({
    name: 'where',
    required: false,
    type: Object,
    description: 'Filter conditions',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: Object,
    description: 'Order by conditions',
  })
  @ApiResponse({ status: 200, description: 'List of customers retrieved.' })
  findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.CustomerWhereUniqueInput,
    @Query('where') where?: Prisma.CustomerWhereInput,
    @Query('orderBy') orderBy?: Prisma.CustomerOrderByWithRelationInput,
  ) {
    return this.customerService.findAll({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the customer' })
  @ApiResponse({ status: 200, description: 'Customer found.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing customer' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the customer' })
  @ApiResponse({ status: 200, description: 'Customer successfully updated.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the customer' })
  @ApiResponse({ status: 200, description: 'Customer successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  remove(@Param('id') id: string) {
    return this.customerService.delete({ id });
  }
}
