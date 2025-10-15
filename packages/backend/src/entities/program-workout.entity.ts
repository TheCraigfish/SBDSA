import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Program } from './program.entity';

@Entity('program_workouts')
export class ProgramWorkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  programId: string;

  @Column()
  dayNumber: number;

  @Column({ type: 'json' })
  workoutTemplate: any;

  @Column({ nullable: true, type: 'text' })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => Program, program => program.workouts, { onDelete: 'CASCADE' })
  program: Program;
}