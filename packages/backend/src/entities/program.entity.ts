import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ProgramWorkout } from './program-workout.entity';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column()
  authorId: string;

  @Column({ type: 'varchar' })
  category: 'powerlifting' | 'bodybuilding' | 'strength' | 'hypertrophy' | 'endurance';

  @Column()
  difficultyLevel: number;

  @Column()
  durationWeeks: number;

  @Column({ default: false })
  public: boolean;

  @Column({ default: false })
  southAfricanSpecific: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  author: User;

  @OneToMany(() => ProgramWorkout, programWorkout => programWorkout.program, { cascade: true })
  workouts?: ProgramWorkout[];
}