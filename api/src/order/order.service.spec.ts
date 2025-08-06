import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { Order, Prisma, PaymentMethod } from '@prisma/client';

describe('OrderService', () => {
  let service: OrderService;
  let prismaService: PrismaService;

  const mockOrder: Order = {
    id: '1',
    customerId: 'customer-1',
    total: 45.99,
    Withdrawal_date: new Date('2025-08-15T14:30:00Z'),
    PaymentMethod: PaymentMethod.CB,
    deposit: 20.00,
    remaining_balance: 25.99,
    delivered: false,
    createdAt: new Date('2025-08-06T00:00:00Z'),
    updatedAt: new Date('2025-08-06T00:00:00Z'),
  };

  const mockOrderWithRelations = {
    ...mockOrder,
    customer: {
      id: 'customer-1',
      lastname: 'Dupont',
      firstname: 'Jean',
      email: 'jean.dupont@example.com',
      phone: '+33123456789',
      address: '123 Rue de la Paix, 75001 Paris',
      createdAt: new Date('2025-01-01T00:00:00Z'),
      updatedAt: new Date('2025-01-01T00:00:00Z'),
    },
    cakes: [
      {
        id: 'cake-1',
        name: 'Chocolate Cake',
        price: 25.99,
        parts: 8,
        color: '#8B4513',
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date('2025-01-01T00:00:00Z'),
      },
      {
        id: 'cake-2',
        name: 'Vanilla Cake',
        price: 20.00,
        parts: 6,
        color: '#F5F5DC',
        createdAt: new Date('2025-01-02T00:00:00Z'),
        updatedAt: new Date('2025-01-02T00:00:00Z'),
      },
    ],
  };

  const mockPrismaService = {
    order: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order with complete data', async () => {
      const createData: Prisma.OrderCreateInput = {
        customer: { connect: { id: 'customer-1' } },
        total: 45.99,
        Withdrawal_date: new Date('2025-08-15T14:30:00Z'),
        PaymentMethod: PaymentMethod.CB,
        deposit: 20.00,
        remaining_balance: 25.99,
        cakes: {
          connect: [
            { id: 'cake-1' },
            { id: 'cake-2' }
          ]
        }
      };

      mockPrismaService.order.create.mockResolvedValue(mockOrder);

      const result = await service.createOrder(createData);

      expect(prismaService.order.create).toHaveBeenCalledWith({
        data: createData,
      });
      expect(result).toEqual(mockOrder);
    });

    it('should create an order with minimal data (no deposit)', async () => {
      const createDataMinimal: Prisma.OrderCreateInput = {
        customer: { connect: { id: 'customer-1' } },
        total: 30.00,
        Withdrawal_date: new Date('2025-08-20T10:00:00Z'),
        PaymentMethod: PaymentMethod.ESPECES,
        cakes: {
          connect: [{ id: 'cake-1' }]
        }
      };

      const minimalOrder = {
        ...mockOrder,
        total: 30.00,
        PaymentMethod: PaymentMethod.ESPECES,
        deposit: null,
        remaining_balance: null,
      };

      mockPrismaService.order.create.mockResolvedValue(minimalOrder);

      const result = await service.createOrder(createDataMinimal);

      expect(prismaService.order.create).toHaveBeenCalledWith({
        data: createDataMinimal,
      });
      expect(result).toEqual(minimalOrder);
    });

    it('should create an order with different payment methods', async () => {
      const createDataCheque: Prisma.OrderCreateInput = {
        customer: { connect: { id: 'customer-2' } },
        total: 75.50,
        Withdrawal_date: new Date('2025-08-18T16:00:00Z'),
        PaymentMethod: PaymentMethod.CHEQUE,
        deposit: 30.00,
        remaining_balance: 45.50,
        cakes: {
          connect: [{ id: 'cake-3' }]
        }
      };

      const chequeOrder = {
        ...mockOrder,
        customerId: 'customer-2',
        total: 75.50,
        PaymentMethod: PaymentMethod.CHEQUE,
        deposit: 30.00,
        remaining_balance: 45.50,
      };

      mockPrismaService.order.create.mockResolvedValue(chequeOrder);

      const result = await service.createOrder(createDataCheque);

      expect(prismaService.order.create).toHaveBeenCalledWith({
        data: createDataCheque,
      });
      expect(result).toEqual(chequeOrder);
    });

    it('should handle creation errors', async () => {
      const createData: Prisma.OrderCreateInput = {
        customer: { connect: { id: 'nonexistent-customer' } },
        total: 50.00,
        Withdrawal_date: new Date('2025-08-15T14:30:00Z'),
        PaymentMethod: PaymentMethod.CB,
      };

      const error = new Error('Customer not found');
      mockPrismaService.order.create.mockRejectedValue(error);

      await expect(service.createOrder(createData)).rejects.toThrow('Customer not found');
    });
  });

  describe('findAllOrder', () => {
    const mockOrders = [mockOrderWithRelations];

    it('should find all orders without parameters', async () => {
      mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

      const result = await service.findAllOrder({});

      expect(prismaService.order.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
        include: {
          customer: true,
          cakes: true,
        },
      });
      expect(result).toEqual(mockOrders);
    });

    it('should find orders with pagination parameters', async () => {
      const params = {
        skip: 0,
        take: 10,
      };

      mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

      const result = await service.findAllOrder(params);

      expect(prismaService.order.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
        include: {
          customer: true,
          cakes: true,
        },
      });
      expect(result).toEqual(mockOrders);
    });

    it('should find orders with filter and sort conditions', async () => {
      const params = {
        where: { 
          delivered: false,
          total: { gte: 20 }
        },
        orderBy: { Withdrawal_date: 'asc' as const },
      };

      mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

      const result = await service.findAllOrder(params);

      expect(prismaService.order.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: { 
          delivered: false,
          total: { gte: 20 }
        },
        orderBy: { Withdrawal_date: 'asc' },
        include: {
          customer: true,
          cakes: true,
        },
      });
      expect(result).toEqual(mockOrders);
    });

    it('should find orders with cursor pagination and customer filter', async () => {
      const params = {
        cursor: { id: '1' },
        take: 5,
        where: { customerId: 'customer-1' },
        orderBy: { createdAt: 'desc' as const },
      };

      mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

      const result = await service.findAllOrder(params);

      expect(prismaService.order.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: 5,
        cursor: { id: '1' },
        where: { customerId: 'customer-1' },
        orderBy: { createdAt: 'desc' },
        include: {
          customer: true,
          cakes: true,
        },
      });
      expect(result).toEqual(mockOrders);
    });

    it('should handle find errors', async () => {
      const error = new Error('Database query error');
      mockPrismaService.order.findMany.mockRejectedValue(error);

      await expect(service.findAllOrder({})).rejects.toThrow('Database query error');
    });
  });

  describe('updateOrder', () => {
    it('should update an order successfully', async () => {
      const updateParams = {
        where: { id: '1' },
        data: { 
          total: 55.99,
          delivered: true,
          remaining_balance: 0
        },
      };

      const updatedOrder = {
        ...mockOrder,
        total: 55.99,
        delivered: true,
        remaining_balance: 0,
      };

      mockPrismaService.order.update.mockResolvedValue(updatedOrder);

      const result = await service.updateOrder(updateParams);

      expect(prismaService.order.update).toHaveBeenCalledWith({
        where: updateParams.where,
        data: updateParams.data,
      });
      expect(result).toEqual(updatedOrder);
    });

    it('should update order delivery status', async () => {
      const updateParams = {
        where: { id: '1' },
        data: { delivered: true },
      };

      const deliveredOrder = {
        ...mockOrder,
        delivered: true,
      };

      mockPrismaService.order.update.mockResolvedValue(deliveredOrder);

      const result = await service.updateOrder(updateParams);

      expect(prismaService.order.update).toHaveBeenCalledWith({
        where: updateParams.where,
        data: updateParams.data,
      });
      expect(result).toEqual(deliveredOrder);
    });

    it('should update order payment information', async () => {
      const updateParams = {
        where: { id: '1' },
        data: { 
          deposit: 45.99,
          remaining_balance: 0,
          PaymentMethod: PaymentMethod.VIREMENT
        },
      };

      const paidOrder = {
        ...mockOrder,
        deposit: 45.99,
        remaining_balance: 0,
        PaymentMethod: PaymentMethod.VIREMENT,
      };

      mockPrismaService.order.update.mockResolvedValue(paidOrder);

      const result = await service.updateOrder(updateParams);

      expect(prismaService.order.update).toHaveBeenCalledWith({
        where: updateParams.where,
        data: updateParams.data,
      });
      expect(result).toEqual(paidOrder);
    });

    it('should handle update errors when order does not exist', async () => {
      const updateParams = {
        where: { id: 'nonexistent' },
        data: { delivered: true },
      };

      const error = new Error('Order not found');
      mockPrismaService.order.update.mockRejectedValue(error);

      await expect(service.updateOrder(updateParams)).rejects.toThrow('Order not found');
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order successfully', async () => {
      const whereCondition = { id: '1' };

      mockPrismaService.order.delete.mockResolvedValue(mockOrder);

      const result = await service.deleteOrder(whereCondition);

      expect(prismaService.order.delete).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockOrder);
    });

    it('should handle delete errors when order does not exist', async () => {
      const whereCondition = { id: 'nonexistent' };
      const error = new Error('Order not found');

      mockPrismaService.order.delete.mockRejectedValue(error);

      await expect(service.deleteOrder(whereCondition)).rejects.toThrow('Order not found');
    });

    it('should delete order by different unique identifier', async () => {
      const whereCondition = { id: '2' };

      mockPrismaService.order.delete.mockResolvedValue(mockOrder);

      const result = await service.deleteOrder(whereCondition);

      expect(prismaService.order.delete).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockOrder);
    });
  });

  describe('findOneOrder', () => {
    it('should find an order by id with relations', async () => {
      const whereCondition = { id: '1' };

      mockPrismaService.order.findUnique.mockResolvedValue(mockOrderWithRelations);

      const result = await service.findOneOrder(whereCondition);

      expect(prismaService.order.findUnique).toHaveBeenCalledWith({
        where: whereCondition,
        include: {
          customer: true,
          cakes: true,
        },
      });
      expect(result).toEqual(mockOrderWithRelations);
    });

    it('should return null when order is not found', async () => {
      const whereCondition = { id: 'nonexistent' };

      mockPrismaService.order.findUnique.mockResolvedValue(null);

      const result = await service.findOneOrder(whereCondition);

      expect(prismaService.order.findUnique).toHaveBeenCalledWith({
        where: whereCondition,
        include: {
          customer: true,
          cakes: true,
        },
      });
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const whereCondition = { id: '1' };
      const error = new Error('Database connection error');
      
      mockPrismaService.order.findUnique.mockRejectedValue(error);

      await expect(service.findOneOrder(whereCondition)).rejects.toThrow('Database connection error');
    });

    it('should find order with complex relations', async () => {
      const whereCondition = { id: '1' };
      
      const complexOrderWithRelations = {
        ...mockOrderWithRelations,
        customer: {
          ...mockOrderWithRelations.customer,
          orders: [], // Évite les références circulaires dans les tests
        },
        cakes: [
          {
            ...mockOrderWithRelations.cakes[0],
            orders: [], // Évite les références circulaires dans les tests
          }
        ]
      };

      mockPrismaService.order.findUnique.mockResolvedValue(complexOrderWithRelations);

      const result = await service.findOneOrder(whereCondition);

      expect(prismaService.order.findUnique).toHaveBeenCalledWith({
        where: whereCondition,
        include: {
          customer: true,
          cakes: true,
        },
      });
      expect(result).toEqual(complexOrderWithRelations);
    });
  });
});
