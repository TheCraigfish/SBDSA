import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

// Global test setup for backend
beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret';
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/sbdsa_test';
  process.env.REDIS_URL = 'redis://localhost:6379/1';
});

// Global test utilities
export const createTestApp = async (): Promise<TestingModule> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  return moduleFixture;
};

// Test helper functions
export const createMockUser = () => ({
  id: 'test-user-id',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  dateOfBirth: new Date('1990-01-01'),
  gender: 'male' as const,
  preferredUnits: 'kg' as const,
  membershipNumber: 'SA123456',
  isActive: true,
  lastLoginAt: new Date(),
  lastActivityAt: new Date(),
  passwordChangedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createMockWorkout = () => ({
  id: 'test-workout-id',
  userId: 'test-user-id',
  date: new Date(),
  notes: 'Test workout',
  isCompleted: false,
  exercises: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createMockExercise = () => ({
  id: 'test-exercise-id',
  name: 'Squat',
  category: 'SQUAT',
  muscleGroups: ['quadriceps', 'glutes'],
  equipment: ['barbell'],
  createdAt: new Date(),
  updatedAt: new Date(),
});