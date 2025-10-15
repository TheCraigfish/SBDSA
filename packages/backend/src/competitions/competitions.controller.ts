import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Competition } from '../entities';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async findAll() {
    return this.competitionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.competitionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('federation/:federation')
  async findByFederation(@Param('federation') federation: string) {
    return this.competitionsService.findByFederation(federation);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() competitionData: Partial<Competition>) {
    return this.competitionsService.create(competitionData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('upcoming')
  async findUpcoming() {
    return this.competitionsService.findUpcoming();
  }
}