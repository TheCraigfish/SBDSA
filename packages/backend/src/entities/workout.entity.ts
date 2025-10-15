import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  durationMinutes?: number;

  @Column({ nullable: true, type: 'text' })
  notes?: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.workouts, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => WorkoutExercise, workoutExercise => workoutExercise.workout, { cascade: true })
  exercises?: WorkoutExercise[];
}