import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { WorkoutExercise } from './workout-exercise.entity';
import { PersonalRecord } from './personal-record.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  category: 'squat' | 'bench' | 'deadlift' | 'accessory' | 'cardio' | 'mobility';

  @Column({ type: 'json' })
  muscleGroups: string[];

  @Column({ type: 'json' })
  equipment: string[];

  @Column({ nullable: true, type: 'text' })
  instructions?: string;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column({ default: false })
  southAfricanStandard?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @OneToMany(() => WorkoutExercise, workoutExercise => workoutExercise.exercise)
  workoutExercises?: WorkoutExercise[];

  @OneToMany(() => PersonalRecord, personalRecord => personalRecord.exercise)
  personalRecords?: PersonalRecord[];
}