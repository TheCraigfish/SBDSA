import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program, ProgramWorkout, UserProgram } from '../entities';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programsRepository: Repository<Program>,
    @InjectRepository(ProgramWorkout)
    private programWorkoutRepository: Repository<ProgramWorkout>,
    @InjectRepository(UserProgram)
    private userProgramRepository: Repository<UserProgram>,
  ) {}

  async create(authorId: string, programData: Partial<Program>): Promise<Program> {
    const program = this.programsRepository.create({
      ...programData,
      authorId,
    });
    return this.programsRepository.save(program);
  }

  async findAll(): Promise<Program[]> {
    return this.programsRepository.find({
      where: { public: true },
      relations: ['workouts'],
    });
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programsRepository.findOne({
      where: { id },
      relations: ['workouts'],
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    return program;
  }

  async enroll(userId: string, programId: string): Promise<UserProgram> {
    // Check if program exists
    const program = await this.findOne(programId);

    // Check if user is already enrolled
    const existingEnrollment = await this.userProgramRepository.findOne({
      where: { userId, programId, completed: false },
    });

    if (existingEnrollment) {
      throw new ForbiddenException('User is already enrolled in this program');
    }

    // Create new user program
    const userProgram = this.userProgramRepository.create({
      userId,
      programId,
      startDate: new Date(),
      currentWeek: 1,
      completed: false,
    });

    return this.userProgramRepository.save(userProgram);
  }

  async findUserPrograms(userId: string): Promise<UserProgram[]> {
    return this.userProgramRepository.find({
      where: { userId },
      relations: ['program'],
    });
  }

  async findActiveProgram(userId: string): Promise<UserProgram | null> {
    return this.userProgramRepository.findOne({
      where: { userId, completed: false },
      relations: ['program', 'program.workouts'],
    });
  }

  async updateUserProgram(
    userProgramId: string,
    userId: string,
    updateData: Partial<UserProgram>
  ): Promise<UserProgram> {
    const userProgram = await this.userProgramRepository.findOne({
      where: { id: userProgramId, userId },
    });

    if (!userProgram) {
      throw new NotFoundException(`User program with ID ${userProgramId} not found`);
    }

    Object.assign(userProgram, updateData);
    return this.userProgramRepository.save(userProgram);
  }
}