import { Controller, Get, Post, Body, Param, UseGuards, Req, Delete, Put } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Workout, WorkoutExercise, Set } from '../entities';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() workoutData: Partial<Workout>) {
    return this.workoutsService.create(req.user.id, workoutData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) {
    return this.workoutsService.findAllByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.workoutsService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Req() req, @Body() workoutData: Partial<Workout>) {
    return this.workoutsService.update(id, req.user.id, workoutData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return this.workoutsService.remove(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/exercises')
  async addExercise(@Param('id') workoutId: string, @Body() exerciseData: Partial<WorkoutExercise>) {
    return this.workoutsService.addExercise(workoutId, exerciseData);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':workoutId/exercises/:exerciseId/sets')
  async addSet(
    @Param('workoutId') workoutId: string,
    @Param('exerciseId') exerciseId: string,
    @Body() setData: Partial<Set>
  ) {
    return this.workoutsService.addSet(workoutId, exerciseId, setData);
  }
}