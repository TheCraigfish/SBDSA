import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  federation: 'PSA' | 'SAPF' | 'CRPSA';

  @Column({ type: 'date' })
  date: Date;

  @Column()
  location: string;

  @Column({ nullable: true, type: 'date' })
  registrationDeadline?: Date;

  @Column({ nullable: true, type: 'json' })
  qualifyingStandards?: any[];

  @CreateDateColumn()
  createdAt: Date;
}