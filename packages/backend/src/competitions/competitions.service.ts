import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from '../entities';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectRepository(Competition)
    private competitionsRepository: Repository<Competition>,
  ) {}

  async create(competitionData: Partial<Competition>): Promise<Competition> {
    const competition = this.competitionsRepository.create(competitionData);
    return this.competitionsRepository.save(competition);
  }

  async findAll(): Promise<Competition[]> {
    return this.competitionsRepository.find({
      order: { date: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Competition> {
    const competition = await this.competitionsRepository.findOne({ where: { id } });
    if (!competition) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }
    return competition;
  }

  async findByFederation(federation: string): Promise<Competition[]> {
    return this.competitionsRepository.find({
      where: { federation: federation as any },
      order: { date: 'ASC' },
    });
  }

  async findUpcoming(): Promise<Competition[]> {
    const today = new Date();
    return this.competitionsRepository.find({
      where: { date: today },
      order: { date: 'ASC' },
    });
  }
}