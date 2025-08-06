import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { Customer, Prisma } from '@prisma/client';

describe('CustomerService', () => {
  let service: CustomerService;
  let prismaService: PrismaService;

  const mockCustomer: Customer = {
    id: '1',
    lastname: 'Dupont',
    firstname: 'Jean',
    email: 'jean.dupont@example.com',
    phone: '+33123456789',
    address: '123 Rue de la Paix, 75001 Paris',
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z'),
  };

  const mockPrismaService = {
    customer: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer with complete data', async () => {
      const createData: Prisma.CustomerCreateInput = {
        lastname: 'Martin',
        firstname: 'Marie',
        email: 'marie.martin@example.com',
        phone: '+33987654321',
        address: '456 Avenue des Champs, 75008 Paris',
      };

      mockPrismaService.customer.create.mockResolvedValue(mockCustomer);

      const result = await service.create(createData);

      expect(prismaService.customer.create).toHaveBeenCalledWith({
        data: createData,
      });
      expect(result).toEqual(mockCustomer);
    });

    it('should create a customer with minimal data (only required fields)', async () => {
      const createDataMinimal: Prisma.CustomerCreateInput = {
        lastname: 'Petit',
        firstname: 'Paul',
      };

      const minimalCustomer = {
        ...mockCustomer,
        lastname: 'Petit',
        firstname: 'Paul',
        email: null,
        phone: null,
        address: null,
      };

      mockPrismaService.customer.create.mockResolvedValue(minimalCustomer);

      const result = await service.create(createDataMinimal);

      expect(prismaService.customer.create).toHaveBeenCalledWith({
        data: createDataMinimal,
      });
      expect(result).toEqual(minimalCustomer);
    });

    it('should handle creation errors', async () => {
      const createData: Prisma.CustomerCreateInput = {
        lastname: 'Error',
        firstname: 'Test',
        email: 'invalid-email',
      };

      const error = new Error('Database constraint violation');
      mockPrismaService.customer.create.mockRejectedValue(error);

      await expect(service.create(createData)).rejects.toThrow('Database constraint violation');
    });
  });

  describe('update', () => {
    it('should update a customer successfully', async () => {
      const updateParams = {
        where: { id: '1' },
        data: { 
          firstname: 'Jean-Claude',
          email: 'jean-claude.dupont@example.com' 
        },
      };

      const updatedCustomer = {
        ...mockCustomer,
        firstname: 'Jean-Claude',
        email: 'jean-claude.dupont@example.com',
      };

      mockPrismaService.customer.update.mockResolvedValue(updatedCustomer);

      const result = await service.update(updateParams);

      expect(prismaService.customer.update).toHaveBeenCalledWith({
        where: updateParams.where,
        data: updateParams.data,
      });
      expect(result).toEqual(updatedCustomer);
    });

    it('should update partial customer data', async () => {
      const updateParams = {
        where: { id: '1' },
        data: { phone: '+33111222333' },
      };

      const updatedCustomer = {
        ...mockCustomer,
        phone: '+33111222333',
      };

      mockPrismaService.customer.update.mockResolvedValue(updatedCustomer);

      const result = await service.update(updateParams);

      expect(prismaService.customer.update).toHaveBeenCalledWith({
        where: updateParams.where,
        data: updateParams.data,
      });
      expect(result).toEqual(updatedCustomer);
    });

    it('should handle update errors when customer does not exist', async () => {
      const updateParams = {
        where: { id: 'nonexistent' },
        data: { firstname: 'Updated Name' },
      };

      const error = new Error('Customer not found');
      mockPrismaService.customer.update.mockRejectedValue(error);

      await expect(service.update(updateParams)).rejects.toThrow('Customer not found');
    });
  });

  describe('findOne', () => {
    it('should find a customer by id', async () => {
      const whereCondition = { id: '1' };

      mockPrismaService.customer.findUnique.mockResolvedValue(mockCustomer);

      const result = await service.findOne(whereCondition);

      expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockCustomer);
    });

    it('should return null when customer is not found', async () => {
      const whereCondition = { id: 'nonexistent' };

      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      const result = await service.findOne(whereCondition);

      expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const whereCondition = { id: '1' };
      const error = new Error('Database connection error');
      
      mockPrismaService.customer.findUnique.mockRejectedValue(error);

      await expect(service.findOne(whereCondition)).rejects.toThrow('Database connection error');
    });
  });

  describe('findAll', () => {
    const mockCustomers: Customer[] = [
      mockCustomer,
      {
        id: '2',
        lastname: 'Bernard',
        firstname: 'Sophie',
        email: 'sophie.bernard@example.com',
        phone: '+33555666777',
        address: '789 Boulevard Saint-Germain, 75006 Paris',
        createdAt: new Date('2025-01-02T00:00:00Z'),
        updatedAt: new Date('2025-01-02T00:00:00Z'),
      },
    ];

    it('should find all customers without parameters', async () => {
      mockPrismaService.customer.findMany.mockResolvedValue(mockCustomers);

      const result = await service.findAll({});

      expect(prismaService.customer.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      });
      expect(result).toEqual(mockCustomers);
    });

    it('should find customers with pagination parameters', async () => {
      const params = {
        skip: 0,
        take: 10,
      };

      mockPrismaService.customer.findMany.mockResolvedValue(mockCustomers);

      const result = await service.findAll(params);

      expect(prismaService.customer.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      });
      expect(result).toEqual(mockCustomers);
    });

    it('should find customers with search and sort conditions', async () => {
      const params = {
        where: { lastname: { contains: 'Dupont' } },
        orderBy: { createdAt: 'desc' as const },
      };

      mockPrismaService.customer.findMany.mockResolvedValue([mockCustomer]);

      const result = await service.findAll(params);

      expect(prismaService.customer.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: { lastname: { contains: 'Dupont' } },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual([mockCustomer]);
    });

    it('should find customers with cursor pagination', async () => {
      const params = {
        cursor: { id: '1' },
        take: 5,
        orderBy: { lastname: 'asc' as const },
      };

      mockPrismaService.customer.findMany.mockResolvedValue(mockCustomers);

      const result = await service.findAll(params);

      expect(prismaService.customer.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: 5,
        cursor: { id: '1' },
        where: undefined,
        orderBy: { lastname: 'asc' },
      });
      expect(result).toEqual(mockCustomers);
    });

    it('should handle find errors', async () => {
      const error = new Error('Database query error');
      mockPrismaService.customer.findMany.mockRejectedValue(error);

      await expect(service.findAll({})).rejects.toThrow('Database query error');
    });
  });

  describe('delete', () => {
    it('should delete a customer successfully', async () => {
      const whereCondition = { id: '1' };

      mockPrismaService.customer.delete.mockResolvedValue(mockCustomer);

      const result = await service.delete(whereCondition);

      expect(prismaService.customer.delete).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockCustomer);
    });

    it('should handle delete errors when customer does not exist', async () => {
      const whereCondition = { id: 'nonexistent' };
      const error = new Error('Customer not found');

      mockPrismaService.customer.delete.mockRejectedValue(error);

      await expect(service.delete(whereCondition)).rejects.toThrow('Customer not found');
    });

    it('should handle delete errors with foreign key constraints', async () => {
      const whereCondition = { id: '1' };
      const error = new Error('Foreign key constraint failed: customer has orders');

      mockPrismaService.customer.delete.mockRejectedValue(error);

      await expect(service.delete(whereCondition)).rejects.toThrow('Foreign key constraint failed: customer has orders');
    });

    it('should delete customer by other unique field', async () => {
      const whereCondition = { id: '2' };

      mockPrismaService.customer.delete.mockResolvedValue(mockCustomer);

      const result = await service.delete(whereCondition);

      expect(prismaService.customer.delete).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockCustomer);
    });
  });
});
