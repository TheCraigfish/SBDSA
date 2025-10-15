import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User as IUser } from '@sbdsa/shared';
import { UserProfile } from './user-profile.entity';
import { Workout } from './workout.entity';
import { UserProgram } from './user-program.entity';
import { PersonalRecord } from './personal-record.entity';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true, type: 'varchar' })
  gender?: 'male' | 'female' | 'other';

  @Column({ nullable: true, type: 'varchar', default: 'kg' })
  preferredUnits: 'kg' | 'lbs';

  @Column({ nullable: true })
  membershipNumber?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLoginAt?: Date;

  @Column({ nullable: true })
  lastActivityAt?: Date;

  @Column({ nullable: true })
  passwordChangedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => UserProfile, profile => profile.user, { cascade: true })
  profile?: UserProfile;

  @OneToMany(() => Workout, workout => workout.user)
  workouts?: Workout[];

  @OneToMany(() => UserProgram, userProgram => userProgram.user)
  userPrograms?: UserProgram[];

  @OneToMany(() => PersonalRecord, personalRecord => personalRecord.user)
  personalRecords?: PersonalRecord[];
}