import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Exercise } from './exercise.entity';
import { Workout } from './workout.entity';

@Entity('personal_records')
export class PersonalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  exerciseId: string;

  @Column({ type: 'varchar' })
  recordType: 'one-rep-max' | 'three-rep-max' | 'five-rep-max' | 'volume' | 'reps' | 'time' | 'distance';

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  value: number;

  @Column({ type: 'varchar' })
  unit: 'kg' | 'lbs' | 'reps' | 'seconds';

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  workoutId?: string;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.personalRecords, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Exercise, exercise => exercise.personalRecords)
  exercise: Exercise;

  @ManyToOne(() => Workout, { nullable: true })
  workout?: Workout;
}