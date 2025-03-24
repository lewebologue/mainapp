import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Customer, Prisma } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CustomerCreateInput) {
    return this.prisma.customer.create({
      data,
    });
  }

  update(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.customer.update({
      where,
      data,
    });
  }

  async findOne(
    customerUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: customerUniqueInput,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}

@ApiTags('customers') // Groupe Swagger pour les clients
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() data: Prisma.CustomerCreateInput) {
    return this.customerService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing customer' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the customer' })
  @ApiResponse({ status: 200, description: 'Customer successfully updated.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  update(@Param('id') id: string, @Body() data: Prisma.CustomerUpdateInput) {
    return this.customerService.update({
      where: { id },
      data,
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
}
