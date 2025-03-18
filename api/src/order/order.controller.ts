import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Add new order' })
  @ApiResponse({
    status: 201,
    description: 'Order successfully added',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    // TODO: Handle relation on DTOs
    return this.orderService.createOrder(createOrderDto as any);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all orders.' })
  findAll() {
    return this.orderService.findAllOrder({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the order with the order ID.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOneOrder({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({
    status: 200,
    description: 'Order updated',
  })
  @ApiResponse({ status: 500, description: 'Error' })
  updateOne(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder({
      where: { id },
      data: updateOrderDto,
    });
  }
  // TODO: Continue router
}
