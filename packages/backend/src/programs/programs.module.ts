import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program, ProgramWorkout, UserProgram } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Program, ProgramWorkout, UserProgram])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
  exports: [ProgramsService],
})
export class ProgramsModule {}