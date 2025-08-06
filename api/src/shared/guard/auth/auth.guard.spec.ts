import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  const mockJwtService = {
    verify: jest.fn(),
  };

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    reflector = module.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    let mockExecutionContext: ExecutionContext;
    let mockRequest: any;

    beforeEach(() => {
      mockRequest = {
        headers: {},
        user: undefined,
      };

      mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
        getHandler: jest.fn(),
        getClass: jest.fn(),
        getType: jest.fn(),
        getArgs: jest.fn(),
        getArgByIndex: jest.fn(),
        switchToRpc: jest.fn(),
        switchToWs: jest.fn(),
      } as ExecutionContext;
    });

    describe('Public routes', () => {
      it('should allow access to public routes without token', () => {
        mockReflector.getAllAndOverride.mockReturnValue(true);

        const result = guard.canActivate(mockExecutionContext);

        expect(reflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
          mockExecutionContext.getHandler(),
          mockExecutionContext.getClass(),
        ]);
        expect(result).toBe(true);
        expect(jwtService.verify).not.toHaveBeenCalled();
      });

      it('should check both handler and class metadata for public decorator', () => {
        mockReflector.getAllAndOverride.mockReturnValue(true);

        guard.canActivate(mockExecutionContext);

        expect(reflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
          mockExecutionContext.getHandler(),
          mockExecutionContext.getClass(),
        ]);
      });
    });

    describe('Protected routes', () => {
      beforeEach(() => {
        mockReflector.getAllAndOverride.mockReturnValue(false);
      });

      it('should throw UnauthorizedException when no authorization header is present', () => {
        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token manquant'));
      });

      it('should throw UnauthorizedException when authorization header is not a string', () => {
        mockRequest.headers.authorization = 123;

        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token manquant'));
      });

      it('should throw UnauthorizedException when authorization header does not start with Bearer', () => {
        mockRequest.headers.authorization = 'Basic token123';

        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token manquant'));
      });

      it('should throw UnauthorizedException when Bearer token is missing', () => {
        mockRequest.headers.authorization = 'Bearer';

        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token manquant'));
      });

      it('should throw UnauthorizedException when Bearer token is empty', () => {
        mockRequest.headers.authorization = 'Bearer ';

        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token manquant'));
      });
    });

    describe('Valid token scenarios', () => {
      const validToken = 'valid.jwt.token';
      const mockPayload = {
        sub: 'user-123',
        email: 'test@example.com',
        iat: 1234567890,
        exp: 1234567999,
      };

      beforeEach(() => {
        mockReflector.getAllAndOverride.mockReturnValue(false);
        mockRequest.headers.authorization = `Bearer ${validToken}`;
      });

      it('should allow access with valid token', () => {
        mockJwtService.verify.mockReturnValue(mockPayload);

        const result = guard.canActivate(mockExecutionContext);

        expect(jwtService.verify).toHaveBeenCalledWith(validToken);
        expect(mockRequest.user).toEqual(mockPayload);
        expect(result).toBe(true);
      });

      it('should set user payload in request object', () => {
        mockJwtService.verify.mockReturnValue(mockPayload);

        guard.canActivate(mockExecutionContext);

        expect(mockRequest.user).toEqual(mockPayload);
        expect(mockRequest.user.sub).toBe('user-123');
        expect(mockRequest.user.email).toBe('test@example.com');
      });

      it('should handle different JWT payload structures', () => {
        const customPayload = {
          sub: 'admin-456',
          email: 'admin@example.com',
          role: 'ADMIN',
          iat: 1234567890,
          exp: 1234567999,
        };

        mockJwtService.verify.mockReturnValue(customPayload);

        const result = guard.canActivate(mockExecutionContext);

        expect(mockRequest.user).toEqual(customPayload);
        expect(result).toBe(true);
      });
    });

    describe('Invalid token scenarios', () => {
      beforeEach(() => {
        mockReflector.getAllAndOverride.mockReturnValue(false);
      });

      it('should throw UnauthorizedException when token is expired', () => {
        mockRequest.headers.authorization = 'Bearer expired.token';
        mockJwtService.verify.mockImplementation(() => {
          throw new Error('TokenExpiredError');
        });

        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token invalide'));
      });

      it('should throw UnauthorizedException when token is malformed', () => {
        mockRequest.headers.authorization = 'Bearer malformed.token';
        mockJwtService.verify.mockImplementation(() => {
          throw new Error('JsonWebTokenError');
        });

        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token invalide'));
      });

      it('should throw UnauthorizedException when token signature is invalid', () => {
        mockRequest.headers.authorization = 'Bearer invalid.signature.token';
        mockJwtService.verify.mockImplementation(() => {
          throw new Error('Invalid signature');
        });

        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token invalide'));
      });

      it('should handle any JWT verification error', () => {
        mockRequest.headers.authorization = 'Bearer any.error.token';
        mockJwtService.verify.mockImplementation(() => {
          throw new Error('Unknown JWT error');
        });

        expect(() =>
          guard.canActivate(mockExecutionContext)
        ).toThrow(new UnauthorizedException('Token invalide'));
      });
    });
  });

  describe('extractTokenFromHeader', () => {
    it('should extract token from Bearer authorization header', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer valid.jwt.token',
        },
      };

      // Utiliser la réflexion pour accéder à la méthode privée
      const token = (guard as any).extractTokenFromHeader(mockRequest);

      expect(token).toBe('valid.jwt.token');
    });

    it('should return undefined when no authorization header', () => {
      const mockRequest = {
        headers: {},
      };

      const token = (guard as any).extractTokenFromHeader(mockRequest);

      expect(token).toBeUndefined();
    });

    it('should return undefined when authorization header is undefined', () => {
      const mockRequest = {
        headers: {
          authorization: undefined,
        },
      };

      const token = (guard as any).extractTokenFromHeader(mockRequest);

      expect(token).toBeUndefined();
    });

    it('should return undefined when authorization header is not a string', () => {
      const mockRequest = {
        headers: {
          authorization: 123,
        },
      };

      const token = (guard as any).extractTokenFromHeader(mockRequest);

      expect(token).toBeUndefined();
    });

    it('should return undefined when authorization type is not Bearer', () => {
      const mockRequest = {
        headers: {
          authorization: 'Basic dXNlcjpwYXNzd29yZA==',
        },
      };

      const token = (guard as any).extractTokenFromHeader(mockRequest);

      expect(token).toBeUndefined();
    });

    it('should return undefined when Bearer has no token', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer',
        },
      };

      const token = (guard as any).extractTokenFromHeader(mockRequest);

      expect(token).toBeUndefined();
    });

    it('should handle authorization header with extra spaces', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer   token.with.spaces   ',
        },
      };

      const token = (guard as any).extractTokenFromHeader(mockRequest);

      // La méthode split(' ') ne préserve que le premier espace, 
      // donc "Bearer   token.with.spaces   " devient ["Bearer", "", "", "token.with.spaces", "", "", ""]
      // et on récupère l'élément à l'index 1 qui est une chaîne vide
      expect(token).toBe('');
    });

    it('should handle authorization header with multiple spaces between Bearer and token', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer     multiple.spaces.token',
        },
      };

      const token = (guard as any).extractTokenFromHeader(mockRequest);

      // Même logique: split(' ') avec des espaces multiples
      expect(token).toBe('');
    });
  });

  describe('Edge cases and error handling', () => {
    let mockExecutionContext: ExecutionContext;

    beforeEach(() => {
      mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: 'Bearer valid.token',
            },
          }),
        }),
        getHandler: jest.fn(),
        getClass: jest.fn(),
        getType: jest.fn(),
        getArgs: jest.fn(),
        getArgByIndex: jest.fn(),
        switchToRpc: jest.fn(),
        switchToWs: jest.fn(),
      } as ExecutionContext;
    });

    it('should handle null request gracefully', () => {
      mockExecutionContext.switchToHttp = jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(null),
      });

      expect(() =>
        guard.canActivate(mockExecutionContext)
      ).toThrow();
    });

    it('should handle request without headers', () => {
      mockReflector.getAllAndOverride.mockReturnValue(false);
      mockExecutionContext.switchToHttp = jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({}),
      });

      expect(() =>
        guard.canActivate(mockExecutionContext)
      ).toThrow(new UnauthorizedException('Token manquant'));
    });

    it('should not modify request when route is public', () => {
      mockReflector.getAllAndOverride.mockReturnValue(true);
      const mockRequest = {
        headers: {},
        user: undefined,
      };

      mockExecutionContext.switchToHttp = jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      guard.canActivate(mockExecutionContext);

      expect(mockRequest.user).toBeUndefined();
      expect(jwtService.verify).not.toHaveBeenCalled();
    });
  });
});
