import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout, WorkoutExercise, Set, Exercise } from '../entities';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>,
    @InjectRepository(WorkoutExercise)
    private workoutExerciseRepository: Repository<WorkoutExercise>,
    @InjectRepository(Set)
    private setRepository: Repository<Set>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async create(userId: string, workoutData: Partial<Workout>): Promise<Workout> {
    const workout = this.workoutsRepository.create({
      ...workoutData,
      userId,
      date: workoutData.date || new Date(),
    });
    return this.workoutsRepository.save(workout);
  }

  async findAllByUserId(userId: string): Promise<Workout[]> {
    return this.workoutsRepository.find({
      where: { userId },
      relations: ['exercises', 'exercises.exercise', 'exercises.sets'],
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Workout> {
    const workout = await this.workoutsRepository.findOne({
      where: { id },
      relations: ['exercises', 'exercises.exercise', 'exercises.sets'],
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    if (workout.userId !== userId) {
      throw new ForbiddenException('You do not have permission to access this workout');
    }

    return workout;
  }

  async update(id: string, userId: string, workoutData: Partial<Workout>): Promise<Workout> {
    const workout = await this.findOne(id, userId);
    Object.assign(workout, workoutData);
    return this.workoutsRepository.save(workout);
  }

  async remove(id: string, userId: string): Promise<void> {
    const workout = await this.findOne(id, userId);
    await this.workoutsRepository.remove(workout);
  }

  async addExercise(workoutId: string, exerciseData: Partial<WorkoutExercise>): Promise<WorkoutExercise> {
    // Verify workout exists
    const workout = await this.workoutsRepository.findOne({ where: { id: workoutId } });
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    // Verify exercise exists
    if (exerciseData.exerciseId) {
      const exercise = await this.exerciseRepository.findOne({ 
        where: { id: exerciseData.exerciseId } 
      });
      if (!exercise) {
        throw new NotFoundException(`Exercise with ID ${exerciseData.exerciseId} not found`);
      }
    }

    const workoutExercise = this.workoutExerciseRepository.create({
      ...exerciseData,
      workoutId,
      orderIndex: exerciseData.orderIndex || 0,
    });

    return this.workoutExerciseRepository.save(workoutExercise);
  }

  async addSet(workoutId: string, exerciseId: string, setData: Partial<Set>): Promise<Set> {
    // Verify workout exercise exists
    const workoutExercise = await this.workoutExerciseRepository.findOne({
      where: { workoutId, exerciseId },
    });

    if (!workoutExercise) {
      throw new NotFoundException(`Workout exercise not found`);
    }

    // Get the next set number
    const lastSet = await this.setRepository.findOne({
      where: { workoutExerciseId: workoutExercise.id },
      order: { setNumber: 'DESC' },
    });

    const set = this.setRepository.create({
      ...setData,
      workoutExerciseId: workoutExercise.id,
      setNumber: lastSet ? lastSet.setNumber + 1 : 1,
    });

    return this.setRepository.save(set);
  }
}