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
    // Handle both frontend format (customerId, cakeIds) and direct format (customer, cakes)
    const customerId =
      createOrderDto.customerId || createOrderDto.customer?.connect?.id;
    const cakeIds =
      createOrderDto.cakeIds ||
      createOrderDto.cakes?.map((cake) => cake.id) ||
      [];

    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    if (cakeIds.length === 0) {
      throw new Error('At least one cake is required');
    }

    const data = {
      customer: { connect: { id: customerId } },
      cakes: { connect: cakeIds.map((cakeId) => ({ id: cakeId })) },
      total: createOrderDto.total,
      Withdrawal_date: createOrderDto.Withdrawal_date,
      PaymentMethod: createOrderDto.PaymentMethod,
      deposit: createOrderDto.deposit,
      remaining_balance: createOrderDto.remaining_balance,
      delivered: createOrderDto.delivered || false,
    };

    return this.orderService.createOrder(data);
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
    const data = {
      ...updateOrderDto,
      cakes: updateOrderDto.cakes
        ? {
            connect: updateOrderDto.cakes.map((cake) => ({ id: cake.id })),
          }
        : undefined,
    };
    return this.orderService.updateOrder({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Order' })
  @ApiResponse({ status: 200, description: 'Order deleted' })
  @ApiResponse({ status: 500, description: 'Error' })
  deleteOne(@Param('id') id: string) {
    return this.orderService.deleteOrder({ id });
  }
}
