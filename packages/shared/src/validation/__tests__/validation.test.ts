import {
  userSchema,
  userProfileSchema,
  exerciseSchema,
  workoutSchema,
  setSchema,
  personalRecordSchema,
  programSchema,
  userProgramSchema,
  loginRequestSchema,
  registerRequestSchema,
  validateAndSanitize,
  validatePartial,
} from '../index';

describe('Validation Schemas', () => {
  describe('userSchema', () => {
    it('should validate a valid user', () => {
      const validUser = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        preferredUnits: 'kg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = userSchema.validate(validUser);
      expect(error).toBeUndefined();
    });

    it('should reject invalid email', () => {
      const invalidUser = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'invalid-email',
        firstName: 'John',
        lastName: 'Doe',
        preferredUnits: 'kg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = userSchema.validate(invalidUser);
      expect(error).toBeDefined();
      expect(error?.message).toContain('email');
    });

    it('should reject missing required fields', () => {
      const incompleteUser = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
      };

      const { error } = userSchema.validate(incompleteUser);
      expect(error).toBeDefined();
    });
  });

  describe('userProfileSchema', () => {
    it('should validate a valid user profile', () => {
      const validProfile = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        federationMembership: [
          {
            federation: 'PSA',
            membershipNumber: 'SA123456',
          }
        ],
        privacySettings: {
          profileVisibility: 'public',
          workoutVisibility: 'public',
          allowDataAnalytics: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = userProfileSchema.validate(validProfile);
      expect(error).toBeUndefined();
    });

    it('should reject invalid federation', () => {
      const invalidProfile = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        federationMembership: [
          {
            federation: 'INVALID',
            membershipNumber: 'SA123456',
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = userProfileSchema.validate(invalidProfile);
      expect(error).toBeDefined();
      expect(error?.message).toContain('federation');
    });

    it('should reject invalid privacy settings', () => {
      const invalidProfile = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        privacySettings: {
          profileVisibility: 'invalid',
          workoutVisibility: 'public',
          allowDataAnalytics: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = userProfileSchema.validate(invalidProfile);
      expect(error).toBeDefined();
      expect(error?.message).toContain('profileVisibility');
    });
  });

  describe('exerciseSchema', () => {
    it('should validate a valid exercise', () => {
      const validExercise = {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Squat',
        category: 'squat',
        muscleGroups: ['quadriceps', 'glutes'],
        equipment: ['barbell'],
        createdAt: new Date(),
      };

      const { error } = exerciseSchema.validate(validExercise);
      expect(error).toBeUndefined();
    });

    it('should reject invalid category', () => {
      const invalidExercise = {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Squat',
        category: 'INVALID',
        muscleGroups: ['quadriceps', 'glutes'],
        equipment: ['barbell'],
        createdAt: new Date(),
      };

      const { error } = exerciseSchema.validate(invalidExercise);
      expect(error).toBeDefined();
      expect(error?.message).toContain('category');
    });
  });

  describe('workoutSchema', () => {
    it('should validate a valid workout', () => {
      const validWorkout = {
        id: '550e8400-e29b-41d4-a716-446655440003',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        date: new Date(),
        notes: 'Great workout',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = workoutSchema.validate(validWorkout);
      expect(error).toBeUndefined();
    });

    it('should reject invalid workout structure', () => {
      const invalidWorkout = {
        id: '550e8400-e29b-41d4-a716-446655440003',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        date: 'invalid-date',
        notes: 'Great workout',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = workoutSchema.validate(invalidWorkout);
      expect(error).toBeDefined();
    });
  });

  describe('setSchema', () => {
    it('should validate a valid set', () => {
      const validSet = {
        id: '550e8400-e29b-41d4-a716-446655440004',
        workoutExerciseId: '550e8400-e29b-41d4-a716-446655440005',
        setNumber: 1,
        weightKg: 100,
        reps: 5,
        rpe: 8,
        createdAt: new Date(),
      };

      const { error } = setSchema.validate(validSet);
      expect(error).toBeUndefined();
    });

    it('should reject invalid RPE', () => {
      const invalidSet = {
        id: '550e8400-e29b-41d4-a716-446655440004',
        workoutExerciseId: '550e8400-e29b-41d4-a716-446655440005',
        setNumber: 1,
        weightKg: 100,
        reps: 5,
        rpe: 15, // RPE should be 1-10
        createdAt: new Date(),
      };

      const { error } = setSchema.validate(invalidSet);
      expect(error).toBeDefined();
      expect(error?.message).toContain('rpe');
    });

    it('should reject negative weight', () => {
      const invalidSet = {
        id: '550e8400-e29b-41d4-a716-446655440004',
        workoutExerciseId: '550e8400-e29b-41d4-a716-446655440005',
        setNumber: 1,
        weightKg: -10,
        reps: 5,
        rpe: 8,
        createdAt: new Date(),
      };

      const { error } = setSchema.validate(invalidSet);
      expect(error).toBeDefined();
      expect(error?.message).toContain('weightKg');
    });
  });

  describe('personalRecordSchema', () => {
    it('should validate a valid personal record with kg unit', () => {
      const validPR = {
        id: '550e8400-e29b-41d4-a716-446655440006',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        exerciseId: '550e8400-e29b-41d4-a716-446655440002',
        recordType: 'one-rep-max',
        value: 100,
        unit: 'kg',
        date: new Date('2023-01-01'),
        verified: false,
        createdAt: new Date(),
      };

      const { error } = personalRecordSchema.validate(validPR);
      expect(error).toBeUndefined();
    });

    it('should validate a valid personal record with meters unit', () => {
      const validPR = {
        id: '550e8400-e29b-41d4-a716-446655440007',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        exerciseId: '550e8400-e29b-41d4-a716-446655440002',
        recordType: 'distance',
        value: 1000,
        unit: 'meters',
        date: new Date('2023-01-01'),
        verified: false,
        createdAt: new Date(),
      };

      const { error } = personalRecordSchema.validate(validPR);
      expect(error).toBeUndefined();
    });

    it('should reject invalid record type', () => {
      const invalidPR = {
        id: '550e8400-e29b-41d4-a716-446655440006',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        exerciseId: '550e8400-e29b-41d4-a716-446655440002',
        recordType: 'INVALID',
        value: 100,
        unit: 'kg',
        date: new Date('2023-01-01'),
        verified: false,
        createdAt: new Date(),
      };

      const { error } = personalRecordSchema.validate(invalidPR);
      expect(error).toBeDefined();
      expect(error?.message).toContain('recordType');
    });

    it('should reject invalid unit', () => {
      const invalidPR = {
        id: '550e8400-e29b-41d4-a716-446655440006',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        exerciseId: '550e8400-e29b-41d4-a716-446655440002',
        recordType: 'one-rep-max',
        value: 100,
        unit: 'INVALID',
        date: new Date('2023-01-01'),
        verified: false,
        createdAt: new Date(),
      };

      const { error } = personalRecordSchema.validate(invalidPR);
      expect(error).toBeDefined();
      expect(error?.message).toContain('unit');
    });
  });

  describe('programSchema', () => {
    it('should validate a valid program', () => {
      const validProgram = {
        id: '550e8400-e29b-41d4-a716-446655440008',
        name: '5x5 StrongLifts',
        description: 'A simple but effective strength program',
        authorId: '550e8400-e29b-41d4-a716-446655440009',
        category: 'powerlifting',
        difficultyLevel: 2,
        durationWeeks: 8,
        public: true,
        southAfricanSpecific: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = programSchema.validate(validProgram);
      expect(error).toBeUndefined();
    });

    it('should reject invalid difficulty level', () => {
      const invalidProgram = {
        id: '550e8400-e29b-41d4-a716-446655440008',
        name: '5x5 StrongLifts',
        description: 'A simple but effective strength program',
        authorId: '550e8400-e29b-41d4-a716-446655440009',
        category: 'powerlifting',
        difficultyLevel: 10, // Should be 1-5
        durationWeeks: 8,
        public: true,
        southAfricanSpecific: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = programSchema.validate(invalidProgram);
      expect(error).toBeDefined();
      expect(error?.message).toContain('difficultyLevel');
    });
  });

  describe('userProgramSchema', () => {
    it('should validate a valid user program', () => {
      const validUserProgram = {
        id: '550e8400-e29b-41d4-a716-446655440010',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        programId: '550e8400-e29b-41d4-a716-446655440008',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-03-01'),
        currentWeek: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { error } = userProgramSchema.validate(validUserProgram);
      expect(error).toBeUndefined();
    });
  });

  describe('loginRequestSchema', () => {
    it('should validate a valid login request', () => {
      const validLogin = {
        email: 'test@example.com',
        password: 'password123',
      };

      const { error } = loginRequestSchema.validate(validLogin);
      expect(error).toBeUndefined();
    });

    it('should reject invalid email', () => {
      const invalidLogin = {
        email: 'invalid-email',
        password: 'password123',
      };

      const { error } = loginRequestSchema.validate(invalidLogin);
      expect(error).toBeDefined();
      expect(error?.message).toContain('email');
    });

    it('should reject short password', () => {
      const invalidLogin = {
        email: 'test@example.com',
        password: '123',
      };

      const { error } = loginRequestSchema.validate(invalidLogin);
      expect(error).toBeDefined();
      expect(error?.message).toContain('password');
    });
  });

  describe('registerRequestSchema', () => {
    it('should validate a valid registration request', () => {
      const validRegister = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };

      const { error } = registerRequestSchema.validate(validRegister);
      expect(error).toBeUndefined();
    });

    it('should reject weak password', () => {
      const invalidRegister = {
        email: 'test@example.com',
        password: 'password', // Too short, missing uppercase, number, and special char
        firstName: 'John',
        lastName: 'Doe',
      };

      const { error } = registerRequestSchema.validate(invalidRegister);
      expect(error).toBeDefined();
      expect(error?.message).toContain('Password must contain');
    });

    it('should reject missing required fields', () => {
      const invalidRegister = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const { error } = registerRequestSchema.validate(invalidRegister);
      expect(error).toBeDefined();
    });
  });
});

describe('Validation Utilities', () => {
  describe('validateAndSanitize', () => {
    it('should validate and return sanitized data', () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };

      const { error, value } = validateAndSanitize(registerRequestSchema, userData);
      expect(error).toBeUndefined();
      expect(value).toEqual(userData);
    });

    it('should return error for invalid data', () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123',
      };

      const { error } = validateAndSanitize(registerRequestSchema, invalidData);
      expect(error).toBeDefined();
    });

    it('should strip unknown fields', () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
        unknownField: 'should be removed',
      };

      const { error, value } = validateAndSanitize(registerRequestSchema, userData);
      expect(error).toBeUndefined();
      expect((value as any).unknownField).toBeUndefined();
    });
  });

  describe('validatePartial', () => {
    it('should validate partial data', () => {
      const partialProfile = {
        bio: 'Fitness enthusiast',
        location: 'Johannesburg, SA',
      };

      const { error, value } = validatePartial(userProfileSchema, partialProfile);
      expect(error).toBeUndefined();
      expect((value as any).bio).toBe('Fitness enthusiast');
      expect((value as any).location).toBe('Johannesburg, SA');
    });

    it('should reject invalid partial data', () => {
      const invalidPartial = {
        privacySettings: {
          profileVisibility: 'invalid',
          workoutVisibility: 'public',
          allowDataAnalytics: true,
        },
      };

      const { error } = validatePartial(userProfileSchema, invalidPartial);
      expect(error).toBeDefined();
    });
  });
});