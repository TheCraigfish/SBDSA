import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity, UserProfile } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findProfileByUserId(userId: string): Promise<UserProfile | null> {
    return this.userProfileRepository.findOne({ 
      where: { userId },
      relations: ['user']
    });
  }

  async updateProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile> {
    let profile = await this.userProfileRepository.findOne({ where: { userId } });
    
    if (!profile) {
      // Create a new profile if one doesn't exist
      profile = this.userProfileRepository.create({
        userId,
        ...profileData,
      });
    } else {
      // Update existing profile
      Object.assign(profile, profileData);
    }
    
    return this.userProfileRepository.save(profile);
  }
}