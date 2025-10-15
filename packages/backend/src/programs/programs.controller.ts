import { Controller, Get, Post, Body, Param, UseGuards, Req, Delete, Put } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Program, UserProgram } from '../entities';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  async findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() programData: Partial<Program>) {
    return this.programsService.create(req.user.id, programData);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/enroll')
  async enroll(@Param('id') programId: string, @Req() req) {
    return this.programsService.enroll(req.user.id, programId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/programs')
  async findMyPrograms(@Req() req) {
    return this.programsService.findUserPrograms(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/active')
  async findActiveProgram(@Req() req) {
    return this.programsService.findActiveProgram(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('my/programs/:userProgramId')
  async updateProgress(
    @Param('userProgramId') userProgramId: string,
    @Req() req,
    @Body() updateData: Partial<UserProgram>
  ) {
    return this.programsService.updateUserProgram(userProgramId, req.user.id, updateData);
  }
}