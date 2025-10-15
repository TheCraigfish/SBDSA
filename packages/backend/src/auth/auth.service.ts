import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User as UserEntity } from '../entities';
import { User, LoginRequest, RegisterRequest, AuthTokens } from '@sbdsa/shared';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      // Don't return password hash
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginRequest: LoginRequest): Promise<{ user: User; tokens: AuthTokens }> {
    const { email, password } = loginRequest;
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const tokens = await this.generateTokens(user);
    
    // Update last login
    await this.usersRepository.update(user.id, { lastLoginAt: new Date() });

    return { user, tokens };
  }

  async register(registerRequest: RegisterRequest): Promise<{ user: User; tokens: AuthTokens }> {
    const { email, password, firstName, lastName, dateOfBirth, gender, membershipNumber } = registerRequest;

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Check if membership number is already taken
    if (membershipNumber) {
      const existingMembership = await this.usersRepository.findOne({ 
        where: { membershipNumber } 
      });
      if (existingMembership) {
        throw new ConflictException('Membership number is already in use');
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = this.usersRepository.create({
      email,
      passwordHash,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      membershipNumber,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedUser = await this.usersRepository.save(newUser);
    
    // Don't return password hash
    const { passwordHash: _, ...result } = savedUser;

    const tokens = await this.generateTokens(result);

    return { user: result, tokens };
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersRepository.findOne({ where: { id: payload.sub } });
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    // In a real implementation, you might want to invalidate the refresh token
    // by storing it in a blacklist or using a token revocation list
    // For now, we'll just update the user's last activity
    await this.usersRepository.update(userId, { lastActivityAt: new Date() });
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { 
      passwordHash: newPasswordHash,
      updatedAt: new Date(),
      passwordChangedAt: new Date(),
    });
  }

  private async generateTokens(user: User | UserEntity): Promise<AuthTokens> {
    const payload = { 
      sub: user.id, 
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
    };
  }
}