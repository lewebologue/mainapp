import { Test, TestingModule } from '@nestjs/testing';
import { CakeService } from './cake.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { Cake, Prisma } from '@prisma/client';

describe('CakeService', () => {
  let service: CakeService;
  let prismaService: PrismaService;

  const mockCake: Cake = {
    id: '1',
    name: 'Chocolate Cake',
    price: 25.99,
    parts: 8,
    color: '#8B4513',
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z'),
  };

  const mockPrismaService = {
    cake: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CakeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CakeService>(CakeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCake', () => {
    it('should create a cake with provided data', async () => {
      const createData: Prisma.CakeCreateInput = {
        name: 'Vanilla Cake',
        price: 20.99,
        parts: 6,
        color: '#F5F5DC',
      };

      mockPrismaService.cake.create.mockResolvedValue(mockCake);

      const result = await service.createCake(createData);

      expect(prismaService.cake.create).toHaveBeenCalledWith({
        data: createData,
      });
      expect(result).toEqual(mockCake);
    });

    it('should create a cake with default color when color is not provided', async () => {
      const createDataWithoutColor: Prisma.CakeCreateInput = {
        name: 'Red Velvet Cake',
        price: 30.99,
        parts: 10,
      };

      const expectedData = {
        ...createDataWithoutColor,
        color: '#FFF',
      };

      mockPrismaService.cake.create.mockResolvedValue(mockCake);

      await service.createCake(createDataWithoutColor);

      expect(prismaService.cake.create).toHaveBeenCalledWith({
        data: expectedData,
      });
    });

    it('should not override color when provided', async () => {
      const createDataWithColor: Prisma.CakeCreateInput = {
        name: 'Strawberry Cake',
        price: 28.99,
        parts: 8,
        color: '#FFB6C1',
      };

      mockPrismaService.cake.create.mockResolvedValue(mockCake);

      await service.createCake(createDataWithColor);

      expect(prismaService.cake.create).toHaveBeenCalledWith({
        data: createDataWithColor,
      });
    });

    it('should handle creation errors', async () => {
      const createData: Prisma.CakeCreateInput = {
        name: 'Error Cake',
        price: 15.99,
        parts: 4,
      };

      const error = new Error('Database error');
      mockPrismaService.cake.create.mockRejectedValue(error);

      await expect(service.createCake(createData)).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    const mockCakes: Cake[] = [
      mockCake,
      {
        id: '2',
        name: 'Vanilla Cake',
        price: 20.99,
        parts: 6,
        color: '#F5F5DC',
        createdAt: new Date('2025-01-02T00:00:00Z'),
        updatedAt: new Date('2025-01-02T00:00:00Z'),
      },
    ];

    it('should find all cakes without parameters', async () => {
      mockPrismaService.cake.findMany.mockResolvedValue(mockCakes);

      const result = await service.findAll({});

      expect(prismaService.cake.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      });
      expect(result).toEqual(mockCakes);
    });

    it('should find cakes with pagination parameters', async () => {
      const params = {
        skip: 0,
        take: 10,
      };

      mockPrismaService.cake.findMany.mockResolvedValue(mockCakes);

      const result = await service.findAll(params);

      expect(prismaService.cake.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      });
      expect(result).toEqual(mockCakes);
    });

    it('should find cakes with cursor and where conditions', async () => {
      const params = {
        cursor: { id: '1' },
        where: { price: { gte: 20 } },
        orderBy: { name: 'asc' as const },
      };

      mockPrismaService.cake.findMany.mockResolvedValue([mockCakes[1]]);

      const result = await service.findAll(params);

      expect(prismaService.cake.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: { id: '1' },
        where: { price: { gte: 20 } },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual([mockCakes[1]]);
    });

    it('should handle find errors', async () => {
      const error = new Error('Find error');
      mockPrismaService.cake.findMany.mockRejectedValue(error);

      await expect(service.findAll({})).rejects.toThrow('Find error');
    });
  });

  describe('updateCake', () => {
    it('should update a cake successfully', async () => {
      const updateParams = {
        where: { id: '1' },
        data: { name: 'Updated Chocolate Cake', price: 27.99 },
      };

      const updatedCake = {
        ...mockCake,
        name: 'Updated Chocolate Cake',
        price: 27.99,
      };

      mockPrismaService.cake.update.mockResolvedValue(updatedCake);

      const result = await service.updateCake(updateParams);

      expect(prismaService.cake.update).toHaveBeenCalledWith({
        data: updateParams.data,
        where: updateParams.where,
      });
      expect(result).toEqual(updatedCake);
    });

    it('should update partial cake data', async () => {
      const updateParams = {
        where: { id: '1' },
        data: { color: '#FF0000' },
      };

      const updatedCake = {
        ...mockCake,
        color: '#FF0000',
      };

      mockPrismaService.cake.update.mockResolvedValue(updatedCake);

      const result = await service.updateCake(updateParams);

      expect(prismaService.cake.update).toHaveBeenCalledWith({
        data: updateParams.data,
        where: updateParams.where,
      });
      expect(result).toEqual(updatedCake);
    });

    it('should handle update errors', async () => {
      const updateParams = {
        where: { id: 'nonexistent' },
        data: { name: 'Updated Name' },
      };

      const error = new Error('Cake not found');
      mockPrismaService.cake.update.mockRejectedValue(error);

      await expect(service.updateCake(updateParams)).rejects.toThrow('Cake not found');
    });
  });

  describe('findOneCake', () => {
    it('should find a cake by id', async () => {
      const whereCondition = { id: '1' };

      mockPrismaService.cake.findUnique.mockResolvedValue(mockCake);

      const result = await service.findOneCake(whereCondition);

      expect(prismaService.cake.findUnique).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockCake);
    });

    it('should return null when cake is not found', async () => {
      const whereCondition = { id: 'nonexistent' };

      mockPrismaService.cake.findUnique.mockResolvedValue(null);

      const result = await service.findOneCake(whereCondition);

      expect(prismaService.cake.findUnique).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toBeNull();
    });

    it('should find a cake by another unique identifier', async () => {
      const whereCondition = { id: '2' };

      mockPrismaService.cake.findUnique.mockResolvedValue(mockCake);

      const result = await service.findOneCake(whereCondition);

      expect(prismaService.cake.findUnique).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockCake);
    });

    it('should handle find unique errors', async () => {
      const whereCondition = { id: '1' };
      const error = new Error('Database connection error');
      
      mockPrismaService.cake.findUnique.mockRejectedValue(error);

      await expect(service.findOneCake(whereCondition)).rejects.toThrow('Database connection error');
    });
  });

  describe('deleteCake', () => {
    it('should delete a cake successfully', async () => {
      const whereCondition = { id: '1' };

      mockPrismaService.cake.delete.mockResolvedValue(mockCake);

      const result = await service.deleteCake(whereCondition);

      expect(prismaService.cake.delete).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockCake);
    });

    it('should delete a cake by another id', async () => {
      const whereCondition = { id: '2' };

      mockPrismaService.cake.delete.mockResolvedValue(mockCake);

      const result = await service.deleteCake(whereCondition);

      expect(prismaService.cake.delete).toHaveBeenCalledWith({
        where: whereCondition,
      });
      expect(result).toEqual(mockCake);
    });

    it('should handle delete errors when cake does not exist', async () => {
      const whereCondition = { id: 'nonexistent' };
      const error = new Error('Cake not found');

      mockPrismaService.cake.delete.mockRejectedValue(error);

      await expect(service.deleteCake(whereCondition)).rejects.toThrow('Cake not found');
    });

    it('should handle delete errors with foreign key constraints', async () => {
      const whereCondition = { id: '1' };
      const error = new Error('Foreign key constraint failed');

      mockPrismaService.cake.delete.mockRejectedValue(error);

      await expect(service.deleteCake(whereCondition)).rejects.toThrow('Foreign key constraint failed');
    });
  });
});
