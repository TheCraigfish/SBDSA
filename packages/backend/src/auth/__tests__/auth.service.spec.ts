import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { User as UserEntity } from '../../entities';
import { LoginRequest, RegisterRequest } from '@sbdsa/shared';
import { createMockUser } from '../../../test/setup';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: Repository<UserEntity>;
  let jwtService: JwtService;

  const mockUser = createMockUser();
  const mockUserWithPassword = {
    ...mockUser,
    passwordHash: 'hashed-password',
  };

  const mockUsersRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      
      mockUsersRepository.findOne.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser(email, password);

      expect(result).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      }));
      expect(result).not.toHaveProperty('passwordHash');
    });

    it('should return null if user does not exist', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';
      
      mockUsersRepository.findOne.mockResolvedValue(null);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      
      mockUsersRepository.findOne.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should return user and tokens if credentials are valid', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(service, 'generateTokens' as any).mockResolvedValue({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 900,
      });

      const result = await service.login(loginRequest);

      expect(result.user).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
      }));
      expect(result.tokens).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 900,
      });
      expect(mockUsersRepository.update).toHaveBeenCalledWith(mockUser.id, {
        lastLoginAt: expect.any(Date),
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginRequest)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is not active', async () => {
      const inactiveUser = { ...mockUserWithPassword, isActive: false };
      mockUsersRepository.findOne.mockResolvedValue(inactiveUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      await expect(service.login(loginRequest)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    const registerRequest: RegisterRequest = {
      email: 'newuser@example.com',
      password: 'password123',
      firstName: 'New',
      lastName: 'User',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
    };

    it('should create and return user with tokens', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password' as never);
      
      // Create a new user that matches the register request
      const newUserWithPassword = {
        ...registerRequest,
        id: 'new-user-id',
        passwordHash: 'hashed-password',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockUsersRepository.create.mockReturnValue(newUserWithPassword);
      mockUsersRepository.save.mockResolvedValue(newUserWithPassword);
      jest.spyOn(service, 'generateTokens' as any).mockResolvedValue({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 900,
      });

      const result = await service.register(registerRequest);

      expect(result.user).toEqual(expect.objectContaining({
        email: registerRequest.email,
        firstName: registerRequest.firstName,
        lastName: registerRequest.lastName,
        dateOfBirth: registerRequest.dateOfBirth,
        gender: registerRequest.gender,
      }));
      expect(result.user).not.toHaveProperty('passwordHash');
      expect(result.tokens).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 900,
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUserWithPassword);

      await expect(service.register(registerRequest)).rejects.toThrow(ConflictException);
    });

    it('should hash password before saving', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password' as never);
      mockUsersRepository.create.mockReturnValue(mockUserWithPassword);
      mockUsersRepository.save.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(service, 'generateTokens' as any).mockResolvedValue({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 900,
      });

      await service.register(registerRequest);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockUsersRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        passwordHash: 'hashed-password',
      }));
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens if refresh token is valid', async () => {
      const refreshToken = 'valid-refresh-token';
      const payload = { sub: mockUser.id, email: mockUser.email };
      
      mockJwtService.verify.mockReturnValue(payload);
      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(service, 'generateTokens' as any).mockResolvedValue({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 900,
      });

      const result = await service.refreshToken(refreshToken);

      expect(result).toEqual({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 900,
      });
    });

    it('should throw UnauthorizedException if refresh token is invalid', async () => {
      const refreshToken = 'invalid-refresh-token';
      
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refreshToken(refreshToken)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const refreshToken = 'valid-refresh-token';
      const payload = { sub: mockUser.id, email: mockUser.email };
      
      mockJwtService.verify.mockReturnValue(payload);
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(service.refreshToken(refreshToken)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is not active', async () => {
      const refreshToken = 'valid-refresh-token';
      const payload = { sub: mockUser.id, email: mockUser.email };
      
      mockJwtService.verify.mockReturnValue(payload);
      mockUsersRepository.findOne.mockResolvedValue({ ...mockUser, isActive: false });

      await expect(service.refreshToken(refreshToken)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should update user last activity', async () => {
      await service.logout(mockUser.id);

      expect(mockUsersRepository.update).toHaveBeenCalledWith(mockUser.id, {
        lastActivityAt: expect.any(Date),
      });
    });
  });

  describe('changePassword', () => {
    it('should change password if current password is correct', async () => {
      const currentPassword = 'current-password';
      const newPassword = 'new-password';
      
      mockUsersRepository.findOne.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('new-hashed-password' as never);

      await service.changePassword(mockUser.id, currentPassword, newPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(currentPassword, 'hashed-password');
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
      expect(mockUsersRepository.update).toHaveBeenCalledWith(mockUser.id, {
        passwordHash: 'new-hashed-password',
        updatedAt: expect.any(Date),
        passwordChangedAt: expect.any(Date),
      });
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(
        service.changePassword(mockUser.id, 'current-password', 'new-password')
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if current password is incorrect', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        service.changePassword(mockUser.id, 'wrong-password', 'new-password')
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});