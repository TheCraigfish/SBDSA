import Joi from 'joi';
import { 
  User, 
  UserProfile, 
  Exercise, 
  Workout, 
  Set, 
  PersonalRecord, 
  Program, 
  UserProgram,
  LoginRequest,
  RegisterRequest 
} from '../types';

// User validation schemas
export const userSchema = Joi.object<User>({
  id: Joi.string().uuid().required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  dateOfBirth: Joi.date().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  preferredUnits: Joi.string().valid('kg', 'lbs').default('kg'),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export const userProfileSchema = Joi.object<UserProfile>({
  id: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  avatarUrl: Joi.string().uri().optional(),
  bio: Joi.string().max(500).optional(),
  location: Joi.string().max(100).optional(),
  gym: Joi.string().max(100).optional(),
  federationMembership: Joi.array().items(
    Joi.object({
      federation: Joi.string().valid('PSA', 'SAPF', 'CRPSA').required(),
      membershipNumber: Joi.string().optional(),
      membershipExpiry: Joi.date().optional(),
      weightClass: Joi.string().optional(),
      ageCategory: Joi.string().optional(),
    })
  ).optional(),
  socialLinks: Joi.object({
    instagram: Joi.string().optional(),
    facebook: Joi.string().optional(),
    youtube: Joi.string().optional(),
  }).optional(),
  privacySettings: Joi.object({
    profileVisibility: Joi.string().valid('public', 'friends', 'private').default('public'),
    workoutVisibility: Joi.string().valid('public', 'friends', 'private').default('public'),
    allowDataAnalytics: Joi.boolean().default(true),
  }).optional(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

// Exercise validation schemas
export const exerciseSchema = Joi.object<Exercise>({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(1).max(100).required(),
  category: Joi.string().valid(
    'squat', 'bench', 'deadlift', 'accessory', 'cardio', 'mobility'
  ).required(),
  muscleGroups: Joi.array().items(
    Joi.string().valid(
      'quadriceps', 'hamstrings', 'glutes', 'calves', 'chest', 'back',
      'shoulders', 'biceps', 'triceps', 'core', 'forearms'
    )
  ).min(1).required(),
  equipment: Joi.array().items(
    Joi.string().valid(
      'barbell', 'dumbbell', 'kettlebell', 'machine', 'cable', 'bodyweight',
      'bands', 'plates', 'squat-rack', 'bench', 'deadlift-platform'
    )
  ).min(1).required(),
  instructions: Joi.string().max(2000).optional(),
  videoUrl: Joi.string().uri().optional(),
  southAfricanStandard: Joi.boolean().default(false),
  createdAt: Joi.date().required(),
});

// Workout validation schemas
export const workoutSchema = Joi.object<Workout>({
  id: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  name: Joi.string().max(100).optional(),
  date: Joi.date().required(),
  durationMinutes: Joi.number().integer().min(1).max(480).optional(),
  notes: Joi.string().max(1000).optional(),
  completed: Joi.boolean().default(false),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export const setSchema = Joi.object<Set>({
  id: Joi.string().uuid().required(),
  workoutExerciseId: Joi.string().uuid().required(),
  setNumber: Joi.number().integer().min(1).max(20).required(),
  weightKg: Joi.number().min(0).max(1000).precision(2).optional(),
  reps: Joi.number().integer().min(1).max(100).optional(),
  rpe: Joi.number().min(1).max(10).precision(1).optional(),
  distanceMeters: Joi.number().min(0).precision(2).optional(),
  durationSeconds: Joi.number().integer().min(1).max(3600).optional(),
  restSeconds: Joi.number().integer().min(0).max(3600).optional(),
  createdAt: Joi.date().required(),
});

// Personal record validation schema
export const personalRecordSchema = Joi.object<PersonalRecord>({
  id: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  exerciseId: Joi.string().uuid().required(),
  recordType: Joi.string().valid(
    'one-rep-max', 'three-rep-max', 'five-rep-max', 'volume', 'reps', 'time', 'distance'
  ).required(),
  value: Joi.number().min(0).precision(2).required(),
  unit: Joi.string().valid('kg', 'lbs', 'reps', 'seconds', 'meters').required(),
  date: Joi.date().required(),
  workoutId: Joi.string().uuid().optional(),
  verified: Joi.boolean().default(false),
  createdAt: Joi.date().required(),
});

// Program validation schemas
export const programSchema = Joi.object<Program>({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(1000).optional(),
  authorId: Joi.string().uuid().required(),
  category: Joi.string().valid(
    'powerlifting', 'bodybuilding', 'strength', 'hypertrophy', 'endurance'
  ).required(),
  difficultyLevel: Joi.number().integer().min(1).max(5).required(),
  durationWeeks: Joi.number().integer().min(1).max(52).required(),
  public: Joi.boolean().default(false),
  southAfricanSpecific: Joi.boolean().default(false),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export const userProgramSchema = Joi.object<UserProgram>({
  id: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  programId: Joi.string().uuid().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  currentWeek: Joi.number().integer().min(1).required(),
  completed: Joi.boolean().default(false),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

// Authentication validation schemas
export const loginRequestSchema = Joi.object<LoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const registerRequestSchema = Joi.object<RegisterRequest>({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  dateOfBirth: Joi.date().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
});

// Custom validation functions
export const validateWeight = (value: number, helpers: any) => {
  // Weight should be a multiple of 0.25kg (smallest plate in SA)
  if (value % 0.25 !== 0) {
    return helpers.error('custom.weightIncrement');
  }
  return value;
};

export const validateRestTime = (value: number, helpers: any) => {
  // Rest time should be in 15-second increments for better tracking
  if (value % 15 !== 0) {
    return helpers.error('custom.restTimeIncrement');
  }
  return value;
};

export const validatePhone = (value: string, helpers: any) => {
  // South African phone number validation
  const saPhoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
  if (!saPhoneRegex.test(value)) {
    return helpers.error('custom.phoneFormat');
  }
  return value;
};

// Custom validation messages
export const customValidationMessages = {
  'custom.weightIncrement': 'Weight must be in 0.25kg increments',
  'custom.restTimeIncrement': 'Rest time must be in 15-second increments',
  'custom.phoneFormat': 'Please enter a valid South African phone number',
};

// Validation utility functions
export const validateAndSanitize = <T>(
  schema: Joi.ObjectSchema<T>,
  data: any,
  options?: Joi.ValidationOptions
): { error?: Joi.ValidationError; value?: T; sanitized?: any } => {
  const defaultOptions: Joi.ValidationOptions = {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
    ...options,
  };

  const { error, value, warning } = schema.validate(data, defaultOptions);

  if (error) {
    return { error };
  }

  return { value, sanitized: value };
};

export const validatePartial = <T>(
  schema: Joi.ObjectSchema<T>,
  data: any,
  options?: Joi.ValidationOptions
): { error?: Joi.ValidationError; value?: Partial<T> } => {
  // Create a partial schema where all fields are optional
  const partialSchema = Joi.object(
    Object.keys(schema.describe().keys).reduce((acc, key) => {
      const fieldSchema = schema.extract(key);
      acc[key] = fieldSchema.optional();
      return acc;
    }, {} as Record<string, any>)
  );
  
  const defaultOptions: Joi.ValidationOptions = {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
    ...options,
  };

  const { error, value } = partialSchema.validate(data, defaultOptions);

  if (error) {
    return { error };
  }

  return { value };
};

// Export all validation schemas and utilities
export default {
  // Schemas
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
  
  // Custom validators
  validateWeight,
  validateRestTime,
  validatePhone,
  
  // Utilities
  validateAndSanitize,
  validatePartial,
  
  // Messages
  customValidationMessages,
};