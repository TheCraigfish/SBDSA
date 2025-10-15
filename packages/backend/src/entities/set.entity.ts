import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity('sets')
export class Set {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workoutExerciseId: string;

  @Column()
  setNumber: number;

  @Column({ nullable: true, type: 'decimal', precision: 5, scale: 2 })
  weightKg?: number;

  @Column({ nullable: true })
  reps?: number;

  @Column({ nullable: true })
  rpe?: number;

  @Column({ nullable: true })
  distanceMeters?: number;

  @Column({ nullable: true })
  durationSeconds?: number;

  @Column({ nullable: true })
  restSeconds?: number;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => WorkoutExercise, workoutExercise => workoutExercise.sets, { onDelete: 'CASCADE' })
  workoutExercise: WorkoutExercise;
}