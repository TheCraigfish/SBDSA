// Core domain types for the SBD SA app

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  preferredUnits: 'kg' | 'lbs'; // Default to kg for South African market
  membershipNumber?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  lastActivityAt?: Date;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // These properties are only used in the backend and should be excluded when sending to the client
  passwordHash?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  gym?: string;
  federationMembership?: FederationMembership[];
  socialLinks?: SocialLinks;
  privacySettings?: PrivacySettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface FederationMembership {
  federation: 'PSA' | 'SAPF' | 'CRPSA'; // South African federations
  membershipNumber?: string;
  membershipExpiry?: Date;
  weightClass?: string;
  ageCategory?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  workoutVisibility: 'public' | 'friends' | 'private';
  allowDataAnalytics: boolean;
}

// Exercise types
export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
  instructions?: string;
  videoUrl?: string;
  southAfricanStandard?: boolean; // Flag for SA-specific exercises
  createdAt: Date;
}

export type ExerciseCategory = 
  | 'squat'
  | 'bench'
  | 'deadlift'
  | 'accessory'
  | 'cardio'
  | 'mobility';

export type MuscleGroup = 
  | 'quadriceps'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'core'
  | 'forearms';

export type Equipment = 
  | 'barbell'
  | 'dumbbell'
  | 'kettlebell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'bands'
  | 'plates'
  | 'squat-rack'
  | 'bench'
  | 'deadlift-platform';

// Workout types
export interface Workout {
  id: string;
  userId: string;
  name?: string;
  date: Date;
  durationMinutes?: number;
  notes?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutExercise {
  id: string;
  workoutId: string;
  exerciseId: string;
  orderIndex: number;
  notes?: string;
  createdAt: Date;
}

export interface Set {
  id: string;
  workoutExerciseId: string;
  setNumber: number;
  weightKg?: number; // Always store in kg, convert for display
  reps?: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  distanceMeters?: number;
  durationSeconds?: number;
  restSeconds?: number;
  createdAt: Date;
}

// Progress tracking types
export interface PersonalRecord {
  id: string;
  userId: string;
  exerciseId: string;
  recordType: RecordType;
  value: number;
  unit: 'kg' | 'lbs' | 'reps' | 'seconds' | 'meters';
  date: Date;
  workoutId?: string;
  verified: boolean;
  createdAt: Date;
}

export type RecordType = 
  | 'one-rep-max'
  | 'three-rep-max'
  | 'five-rep-max'
  | 'volume'
  | 'reps'
  | 'time'
  | 'distance';

// Program types
export interface Program {
  id: string;
  name: string;
  description?: string;
  authorId: string;
  category: ProgramCategory;
  difficultyLevel: number; // 1-5 scale
  durationWeeks: number;
  public: boolean;
  southAfricanSpecific: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProgramCategory = 
  | 'powerlifting'
  | 'bodybuilding'
  | 'strength'
  | 'hypertrophy'
  | 'endurance';

export interface ProgramWorkout {
  id: string;
  programId: string;
  dayNumber: number;
  workoutTemplate: WorkoutTemplate;
  notes?: string;
  createdAt: Date;
}

export interface WorkoutTemplate {
  name: string;
  exercises: TemplateExercise[];
}

export interface TemplateExercise {
  exerciseId: string;
  orderIndex: number;
  sets: TemplateSet[];
  notes?: string;
}

export interface TemplateSet {
  setNumber: number;
  weightKg?: number;
  reps?: number;
  rpe?: number;
  restSeconds?: number;
  intensity?: number; // Percentage of 1RM
}

export interface UserProgram {
  id: string;
  userId: string;
  programId: string;
  startDate: Date;
  endDate?: Date;
  currentWeek: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics types
export interface ProgressAnalytics {
  userId: string;
  exerciseId: string;
  period: AnalyticsPeriod;
  data: AnalyticsDataPoint[];
  calculatedAt: Date;
}

export type AnalyticsPeriod = 
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

export interface AnalyticsDataPoint {
  date: Date;
  oneRepMax: number;
  volume: number; // Total weight * reps
  frequency: number; // Number of sessions
  avgIntensity: number; // Average percentage of 1RM
}

// South African specific types
export interface Competition {
  id: string;
  name: string;
  federation: 'PSA' | 'SAPF' | 'CRPSA';
  date: Date;
  location: string;
  registrationDeadline?: Date;
  qualifyingStandards?: QualifyingStandard[];
  createdAt: Date;
}

export interface QualifyingStandard {
  ageCategory: string;
  weightClass: string;
  gender: 'male' | 'female';
  squatKg: number;
  benchKg: number;
  deadliftKg: number;
  totalKg: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Authentication types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  membershipNumber?: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// Sync types for offline functionality
export interface SyncQueueItem {
  id: string;
  entityType: 'workout' | 'set' | 'user-profile' | 'personal-record';
  entityId: string;
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: Date;
  synced: boolean;
}

export interface SyncStatus {
  lastSyncAt?: Date;
  pendingItems: number;
  syncInProgress: boolean;
  online: boolean;
}

// App state types
export interface AppState {
  user: User | null;
  userProfile: UserProfile | null;
  authTokens: AuthTokens | null;
  syncStatus: SyncStatus;
  isLoading: boolean;
  error: string | null;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Workouts: undefined;
  Programs: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type WorkoutStackParamList = {
  WorkoutList: undefined;
  WorkoutDetail: { workoutId: string };
  ActiveWorkout: { workoutId?: string };
  ExerciseSelection: undefined;
  WorkoutHistory: undefined;
};

export type ProgramStackParamList = {
  ProgramList: undefined;
  ProgramDetail: { programId: string };
  ActiveProgram: { userProgramId: string };
  ProgramLibrary: undefined;
};

export type ProfileStackParamList = {
  ProfileDetail: undefined;
  EditProfile: undefined;
  Settings: undefined;
  PersonalRecords: undefined;
  Analytics: undefined;
};