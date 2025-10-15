import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';
import { Set } from './set.entity';

@Entity('workout_exercises')
export class WorkoutExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workoutId: string;

  @Column()
  exerciseId: string;

  @Column()
  orderIndex: number;

  @Column({ nullable: true, type: 'text' })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => Workout, workout => workout.exercises, { onDelete: 'CASCADE' })
  workout: Workout;

  @ManyToOne(() => Exercise, exercise => exercise.workoutExercises)
  exercise: Exercise;

  @OneToMany(() => Set, set => set.workoutExercise, { cascade: true })
  sets?: Set[];
}