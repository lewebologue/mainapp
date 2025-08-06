import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const mockUserService = {
      findByEmailOrName: jest.fn(),
    };

    const mockJwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    const mockUser = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      name: 'testuser',
      Role: Role.USER,
      password: '$2b$10$hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const identifier = 'testuser';
    const password = 'plainpassword';
    const mockToken = 'mock.jwt.token';

    it('should successfully sign in with valid credentials', async () => {
      // Arrange
      userService.findByEmailOrName.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(true as never);
      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await service.signIn(identifier, password);

      // Assert
      expect(userService.findByEmailOrName).toHaveBeenCalledWith(identifier);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        name: mockUser.name,
        role: mockUser.Role,
      });
      expect(result).toEqual({
        user: mockUser.name,
        role: mockUser.Role,
        access_token: mockToken,
      });
    });

    it('should throw HttpException when user is not found', async () => {
      // Arrange
      userService.findByEmailOrName.mockResolvedValue(null);

      // Act & Assert
      await expect(service.signIn(identifier, password)).rejects.toThrow(
        new HttpException('User not found', 404),
      );
      expect(userService.findByEmailOrName).toHaveBeenCalledWith(identifier);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should throw HttpException when password is invalid', async () => {
      // Arrange
      userService.findByEmailOrName.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(false as never);

      // Act & Assert
      await expect(service.signIn(identifier, password)).rejects.toThrow(
        new HttpException('Invalid credentials', 403),
      );
      expect(userService.findByEmailOrName).toHaveBeenCalledWith(identifier);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should handle user with empty name gracefully', async () => {
      // Arrange
      const userWithoutName = { ...mockUser, name: null };
      userService.findByEmailOrName.mockResolvedValue(userWithoutName);
      mockedBcrypt.compare.mockResolvedValue(true as never);
      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await service.signIn(identifier, password);

      // Assert
      expect(result).toEqual({
        user: '',
        role: userWithoutName.Role,
        access_token: mockToken,
      });
    });

    it('should work with email as identifier', async () => {
      // Arrange
      const emailIdentifier = 'test@example.com';
      userService.findByEmailOrName.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(true as never);
      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await service.signIn(emailIdentifier, password);

      // Assert
      expect(userService.findByEmailOrName).toHaveBeenCalledWith(
        emailIdentifier,
      );
      expect(result).toEqual({
        user: mockUser.name,
        role: mockUser.Role,
        access_token: mockToken,
      });
    });

    it('should handle different user roles correctly', async () => {
      // Arrange
      const adminUser = { ...mockUser, Role: Role.ADMIN };
      userService.findByEmailOrName.mockResolvedValue(adminUser);
      mockedBcrypt.compare.mockResolvedValue(true as never);
      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await service.signIn(identifier, password);

      // Assert
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        name: adminUser.name,
        role: Role.ADMIN,
      });

      expect(result.role).toBe(Role.ADMIN);
    });
  });
});
