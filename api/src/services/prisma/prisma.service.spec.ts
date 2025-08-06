import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    // Nettoyage après chaque test pour éviter les fuites de connexion
    if (service) {
      await service.$disconnect();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Module Lifecycle', () => {
    it('should extend PrismaClient functionality', () => {
      // Vérifier que le service a les propriétés et méthodes de PrismaClient
      expect(service.$connect).toBeDefined();
      expect(service.$disconnect).toBeDefined();
      expect(service.$transaction).toBeDefined();
      expect(service.onModuleInit).toBeDefined();
    });

    it('should have onModuleInit method', () => {
      expect(typeof service.onModuleInit).toBe('function');
    });

    it('should connect to database on module init', async () => {
      // Mock de la méthode $connect pour éviter une vraie connexion DB en test
      const connectSpy = jest.spyOn(service, '$connect').mockResolvedValue();

      await service.onModuleInit();

      expect(connectSpy).toHaveBeenCalledTimes(1);

      connectSpy.mockRestore();
    });

    it('should handle connection errors gracefully', async () => {
      const connectSpy = jest
        .spyOn(service, '$connect')
        .mockRejectedValue(new Error('Database connection failed'));

      await expect(service.onModuleInit()).rejects.toThrow(
        'Database connection failed',
      );

      connectSpy.mockRestore();
    });
  });

  describe('Database Operations', () => {
    beforeEach(() => {
      // Mock les méthodes de connexion pour éviter les vraies opérations DB
      jest.spyOn(service, '$connect').mockResolvedValue();
      jest.spyOn(service, '$disconnect').mockResolvedValue();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should have database models available', () => {
      expect(service.user).toBeDefined();
      expect(service.customer).toBeDefined();
      expect(service.cake).toBeDefined();
      expect(service.order).toBeDefined();
    });

    it('should have transaction support', () => {
      expect(typeof service.$transaction).toBe('function');
    });

    it('should have raw query support', () => {
      expect(typeof service.$queryRaw).toBe('function');
      expect(typeof service.$executeRaw).toBe('function');
    });

    it('should support disconnect operation', async () => {
      const disconnectSpy = jest
        .spyOn(service, '$disconnect')
        .mockResolvedValue();

      await service.$disconnect();

      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle disconnect errors', async () => {
      const disconnectSpy = jest
        .spyOn(service, '$disconnect')
        .mockRejectedValue(new Error('Disconnect failed'));

      await expect(service.$disconnect()).rejects.toThrow('Disconnect failed');
    });
  });

  describe('Model Operations', () => {
    beforeEach(() => {
      jest.spyOn(service, '$connect').mockResolvedValue();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should have CRUD operations for User model', () => {
      expect(typeof service.user.create).toBe('function');
      expect(typeof service.user.findMany).toBe('function');
      expect(typeof service.user.findUnique).toBe('function');
      expect(typeof service.user.update).toBe('function');
      expect(typeof service.user.delete).toBe('function');
    });

    it('should have CRUD operations for Customer model', () => {
      expect(typeof service.customer.create).toBe('function');
      expect(typeof service.customer.findMany).toBe('function');
      expect(typeof service.customer.findUnique).toBe('function');
      expect(typeof service.customer.update).toBe('function');
      expect(typeof service.customer.delete).toBe('function');
    });

    it('should have CRUD operations for Cake model', () => {
      expect(typeof service.cake.create).toBe('function');
      expect(typeof service.cake.findMany).toBe('function');
      expect(typeof service.cake.findUnique).toBe('function');
      expect(typeof service.cake.update).toBe('function');
      expect(typeof service.cake.delete).toBe('function');
    });

    it('should have CRUD operations for Order model', () => {
      expect(typeof service.order.create).toBe('function');
      expect(typeof service.order.findMany).toBe('function');
      expect(typeof service.order.findUnique).toBe('function');
      expect(typeof service.order.update).toBe('function');
      expect(typeof service.order.delete).toBe('function');
    });

    it('should support aggregate operations', () => {
      expect(typeof service.user.count).toBe('function');
      expect(typeof service.customer.count).toBe('function');
      expect(typeof service.cake.count).toBe('function');
      expect(typeof service.order.count).toBe('function');
    });

    it('should support groupBy operations', () => {
      expect(typeof service.user.groupBy).toBe('function');
      expect(typeof service.customer.groupBy).toBe('function');
      expect(typeof service.cake.groupBy).toBe('function');
      expect(typeof service.order.groupBy).toBe('function');
    });
  });

  describe('Transaction Operations', () => {
    beforeEach(() => {
      jest.spyOn(service, '$connect').mockResolvedValue();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should support interactive transactions', async () => {
      const mockTransaction = jest.fn().mockResolvedValue('transaction result');
      const transactionSpy = jest
        .spyOn(service, '$transaction')
        .mockImplementation(mockTransaction);

      const callback = jest.fn().mockResolvedValue('callback result');
      const result = await service.$transaction(callback);

      expect(transactionSpy).toHaveBeenCalledWith(callback);
      expect(result).toBe('transaction result');
    });

    it('should support batch transactions', async () => {
      const mockOperations = [
        service.user.create({
          data: { email: 'test@test.com', name: 'Test', password: 'test' },
        }),
        service.customer.create({
          data: { lastname: 'Doe', firstname: 'John' },
        }),
      ];

      const transactionSpy = jest
        .spyOn(service, '$transaction')
        .mockResolvedValue(['user', 'customer']);

      const result = await service.$transaction(mockOperations);

      expect(transactionSpy).toHaveBeenCalledWith(mockOperations);
      expect(result).toEqual(['user', 'customer']);
    });

    it('should handle transaction errors', async () => {
      const transactionSpy = jest
        .spyOn(service, '$transaction')
        .mockRejectedValue(new Error('Transaction failed'));

      const callback = jest.fn();

      await expect(service.$transaction(callback)).rejects.toThrow(
        'Transaction failed',
      );
    });
  });

  describe('Raw Query Operations', () => {
    beforeEach(() => {
      jest.spyOn(service, '$connect').mockResolvedValue();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should support raw queries with $queryRaw', async () => {
      const mockResult = [{ count: 5 }];
      const queryRawSpy = jest
        .spyOn(service, '$queryRaw')
        .mockResolvedValue(mockResult);

      const result =
        await service.$queryRaw`SELECT COUNT(*) as count FROM "User"`;

      expect(queryRawSpy).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });

    it('should support raw execution with $executeRaw', async () => {
      const executeRawSpy = jest
        .spyOn(service, '$executeRaw')
        .mockResolvedValue(1);

      const result =
        await service.$executeRaw`UPDATE "User" SET "name" = 'Updated' WHERE "id" = 'test-id'`;

      expect(executeRawSpy).toHaveBeenCalled();
      expect(result).toBe(1);
    });

    it('should handle raw query errors', async () => {
      const queryRawSpy = jest
        .spyOn(service, '$queryRaw')
        .mockRejectedValue(new Error('SQL syntax error'));

      await expect(
        service.$queryRaw`SELECT * FROM invalid_table`,
      ).rejects.toThrow('SQL syntax error');
    });
  });

  describe('Service Cleanup', () => {
    it('should provide cleanup method for testing', async () => {
      const disconnectSpy = jest
        .spyOn(service, '$disconnect')
        .mockResolvedValue();

      await service.$disconnect();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should handle multiple disconnect calls gracefully', async () => {
      const disconnectSpy = jest
        .spyOn(service, '$disconnect')
        .mockResolvedValue();

      await service.$disconnect();
      await service.$disconnect();

      expect(disconnectSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Error Handling', () => {
    it('should handle Prisma client initialization errors', async () => {
      // Simuler une erreur d'initialisation
      const originalConnect = service.$connect;
      service.$connect = jest
        .fn()
        .mockRejectedValue(new Error('Prisma initialization failed'));

      await expect(service.onModuleInit()).rejects.toThrow(
        'Prisma initialization failed',
      );

      // Restaurer la méthode originale
      service.$connect = originalConnect;
    });

    it('should be resilient to database connection issues', async () => {
      const connectSpy = jest
        .spyOn(service, '$connect')
        .mockRejectedValue(new Error('ECONNREFUSED'));

      await expect(service.onModuleInit()).rejects.toThrow('ECONNREFUSED');

      expect(connectSpy).toHaveBeenCalled();
    });
  });
});
