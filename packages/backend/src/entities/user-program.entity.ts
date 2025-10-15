import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Program } from './program.entity';

@Entity('user_programs')
export class UserProgram {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  programId: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ nullable: true, type: 'date' })
  endDate?: Date;

  @Column({ default: 1 })
  currentWeek: number;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.userPrograms, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Program, { onDelete: 'CASCADE' })
  program: Program;
}